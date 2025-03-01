const gulp = require('gulp');
const { series, parallel, src, dest, watch } = require('gulp');
const connectSSI = require('connect-ssi');
const fs = require('fs-extra');
const noop = require('gulp-noop');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const mergeStream = require('merge-stream');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlsplit = require('gulp-htmlsplit');
const inlinesource = require('gulp-inline-source');
const lec = require('gulp-line-ending-corrector');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const glob = require('glob');
const fileinclude = require('gulp-file-include');
const YAML = require('yaml');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const storage = require('gulp-storage')(gulp);
const browserSync = require('browser-sync').create();
const { createProxyMiddleware } = require('http-proxy-middleware');

const GULP_STATES = {
    file_paths: [],
    type: '',
};

gulp.storage.create('result', 'watchPath.json');

try {
    fs.statSync('./file_paths.yaml');
    GULP_STATES.file_paths = YAML.parse(fs.readFileSync('./file_paths.yaml', 'utf8'));
} catch (err) {
    console.log('file_paths.yaml 파일이 존재하지 않거나, 오류가 발생했습니다.');
    console.log('오류내용: ', err);
}

/* ------------------------ personal setting ------------------------ */
const ROOT = '/PROJECT/'; //프로텍트가 모여 있는 최상단 폴더경로
// const PORT = 3000; // test 연결 포트
const PORT = 4441; // 연결 포트
// const UIPORT = 3001; // test 연결 포트
const UIPORT = 4001; // 연결 포트
const userCssOptions = { isCompacted: false }; //css minify 여부 (true: compact, false: minify)
/* ----------------------------------------------------------------- */

function pathConvert(type) {
    return GULP_STATES.file_paths.paths.map((path) => path + type);
}

function connectServer(done) {
    const _html = watch(pathConvert('src/**/*.html'));
    const _scss = watch(pathConvert('src/scss/**/*.scss'));
    const _js = watch(pathConvert('src/js/**/*.js'));
    const _json = watch(pathConvert('src/data/**/*.json'));

    gulp.storage.set('watchPath', '');

    browserSync.init({
        server: {
            baseDir: __dirname + ROOT,
            directory: true,
            middleware: [
                connectSSI({
                    baseDir: __dirname + ROOT,
                    ext: '.html',
                }),
                createProxyMiddleware('/sec', {
                    target: 'https://www.samsung.com',
                    changeOrigin: true,
                    secure: false,
                }),
            ],
        },
        port: PORT,
        ui: {
            port: UIPORT,
        },
        open: false,
        ghostMode: false,
        // codeSync: false,
    });

    _html.on('all', function (stats, path) {
        console.log(stats);
        console.log(path);
        gulp.storage.set('watchPath', `./${path.replace(/\\/g, '/')}`);
        series(localExport, reload)();
    });
    _scss.on('all', function (stats, path) {
        console.log(stats);
        console.log(path);
        gulp.storage.set('watchPath', `./${path.replace(/\\/g, '/')}`);
        series(vwConvert, reload)();
    });
    _js.on('all', function (stats, path) {
        console.log(stats);
        console.log(path);
        gulp.storage.set('watchPath', `./${path.replace(/\\/g, '/')}`);
        series(jsBuild, reload)();
    });
    _json.on('all', function (stats, path) {
        console.log(stats);
        console.log(path);
        gulp.storage.set('watchPath', `./${path.replace(/\\/g, '/')}`);
        series(jsBuild, reload)();
    });

    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function vwConvert(done) {
    let tasks = [];
    const watchPath = gulp.storage.get('watchPath');
    const path = !watchPath.includes('/_') && watchPath.includes('.scss') ? watchPath : watchPath.replace(/src.+/g, "$'src/scss/*.scss");
    if (watchPath === '') {
        for (let i = 0, count = GULP_STATES.file_paths.paths.length ; i < count; i++) {
            const tmp = GULP_STATES.file_paths.paths[i];
            let aPath;
            try {
                aPath = require(tmp + "src/asset_path.json");
            } catch (err) {
                console.log(err);
            }
            const files = fs.readdirSync(tmp + 'src/scss/');
            const scssFiles = files.filter((a) => {
                if (a.indexOf('.scss') !== -1 || a.indexOf('.sass') !== -1) {
                    return a;
                }
            });
            if (!scssFiles.length) {
                if (count === i+1) {
                    done();
                }
                continue;
            }

            tasks.push(
                src(tmp + 'src/scss/*.scss')
                    .pipe(GULP_STATES.type === 'build' ? noop() : sourcemaps.init())
                    .pipe(plumber())
                    .pipe(
                        sass({
                            charset: false,
                            indentType: 'tab',
                            indentWidth: 1,
                            precision: 3,

                            sourceComments: false,
                            includePaths: [require('node-bourbon').includePaths],
                        }).on('error', sass.logError)
                    )
                    .pipe(aPath.isLive ?
                        cleanCSS({
                            compatibility: '*',
                            format: {
                                breaks: {
                                    afterAtRule: false,
                                    afterBlockBegins: userCssOptions.isCompacted,
                                    afterBlockEnds: userCssOptions.isCompacted,
                                    afterComment: true,
                                    afterProperty: false,
                                    afterRuleBegins: false,
                                    afterRuleEnds: userCssOptions.isCompacted,
                                    beforeBlockEnds: userCssOptions.isCompacted,
                                    betweenSelectors: false,
                                },
                                breakWith: '\\r\\n',
                                indentBy: 0,
                                indentWith: 'tab',
                                spaces: {
                                    aroundSelectorRelation: false,
                                    beforeBlockBegins: false,
                                    beforeValue: false,
                                },
                                wrapAt: false,
                            },
                        }) : noop()
                    )
                    .pipe(
                        GULP_STATES.type === 'build'
                            ? cleanCSS({
                                  compatibility: '*',
                                  format: {
                                      breaks: {
                                          afterAtRule: false,
                                          afterBlockBegins: userCssOptions.isCompacted,
                                          afterBlockEnds: userCssOptions.isCompacted,
                                          afterComment: true,
                                          afterProperty: false,
                                          afterRuleBegins: false,
                                          afterRuleEnds: userCssOptions.isCompacted,
                                          beforeBlockEnds: userCssOptions.isCompacted,
                                          betweenSelectors: false,
                                      },
                                      breakWith: '\\r\\n',
                                      indentBy: 0,
                                      indentWith: 'tab',
                                      spaces: {
                                          aroundSelectorRelation: false,
                                          beforeBlockBegins: false,
                                          beforeValue: false,
                                      },
                                      wrapAt: false,
                                  },
                                  level: {
                                      2: {
                                          mergeAdjacentRules: true,
                                          mergeIntoShorthands: true,
                                          mergeMedia: true,
                                          mergeNonAdjacentRules: true,
                                          mergeSemantically: true,
                                          overrideProperties: false,
                                          removeEmpty: true,
                                          reduceNonAdjacentRules: true,
                                          removeDuplicateFontRules: true,
                                          removeDuplicateMediaBlocks: false,
                                          removeDuplicateRules: true,
                                          removeUnusedAtRules: false,
                                          restructureRules: false,
                                          mergeMediaQueries: true,
                                      },
                                  },
                              })
                            : noop()
                    )
                    .pipe(plumber.stop())
                    .pipe(replace(/(\.\.\/|\.\/)*is\/images/g, aPath.isLive ? '../../../../is/images' : '../../../is/images'))
                    .pipe(GULP_STATES.type === 'build' ? noop() : sourcemaps.write())
                    .pipe(dest(tmp + 'output/local/css/'))
                    .on('end', function () {
                        if (count === i+1) {
                            done();
                        }
                    })
            );
        }
    } else {
        const livePath = watchPath.split('src/')[0];

        let aPath;
		try {
			aPath = require(livePath + "src/asset_path.json");
		} catch (err) {
			console.log(err);
		}

        tasks.push(
            src(path)
                .pipe(sourcemaps.init())
                .pipe(plumber())
                .pipe(
                    sass({
                        charset: false,
                        indentType: 'tab',
                        indentWidth: 1,
                        precision: 3,
                        sourceComments: false,
                        includePaths: [require('node-bourbon').includePaths],
                    }).on('error', sass.logError)
                )
                .pipe(aPath.isLive? 
                    cleanCSS({
                        compatibility: '*',
                        format: {
                            breaks: {
                                afterAtRule: false,
                                afterBlockBegins: userCssOptions.isCompacted,
                                afterBlockEnds: userCssOptions.isCompacted,
                                afterComment: true,
                                afterProperty: false,
                                afterRuleBegins: false,
                                afterRuleEnds: userCssOptions.isCompacted,
                                beforeBlockEnds: userCssOptions.isCompacted,
                                betweenSelectors: false,
                            },
                            breakWith: '\\r\\n',
                            indentBy: 0,
                            indentWith: 'tab',
                            spaces: {
                                aroundSelectorRelation: false,
                                beforeBlockBegins: false,
                                beforeValue: false,
                            },
                            wrapAt: false,
                        },
                        
                    }) : noop()
                )
                .pipe(plumber.stop())
                .pipe(replace(/(\.\.\/|\.\/)*is\/images/g, aPath.isLive ? '../../../../is/images' : '../../../is/images'))
                .pipe(sourcemaps.write())
                .pipe(dest(path.replace('src/scss', 'output/local/css').replace(/css.+/g, "$'css")))
                .on('end', function () {
                    done();
                })
        );
    }

    mergeStream.apply(null, tasks);
}

function autoPrefix(done) {
    let tasks = [];
    for (let i = 0, count = GULP_STATES.file_paths.paths.length; i < count; i++) {
        const tmp = GULP_STATES.file_paths.paths[i];
        let files;
        try {
            files = fs.readdirSync(tmp + 'output/local/css');
        } catch (err) {
            files = [];
        }
        const cssFiles = files.filter((a) => {
            if (a.indexOf('.css') !== -1) {
                return a;
            }
        });
        if (!cssFiles.length) {
            if (count === i+1) {
                done();
            }
            continue;
        }
        tasks.push(
            src(tmp + 'output/local/css/*.css')
                .pipe(plumber())
                .pipe(
                    postcss([
                        autoprefixer('last 2 versions', {
                            cascade: false,
                        }),
                    ])
                )
                .pipe(plumber.stop())
                .pipe(dest(tmp + 'output/local/css/'))
                .on('end', function () {
                    if (count === i+1) {
                        done();
                    }
                })
        );
    }
    mergeStream.apply(null, tasks);
}

function jsBuild(done) {
    let tasks = [];
    const watchPath = gulp.storage.get('watchPath');
    const path = watchPath.includes('.js') && !watchPath.includes('/js/modules/') && watchPath.indexOf('.json') === -1 ? watchPath : watchPath.replace(/src.+/g, "$'src/js") + '/*.js';

    if (watchPath === '') {
        let pathCount = GULP_STATES.file_paths.paths.length;
        for (let i = 0; i < GULP_STATES.file_paths.paths.length; i++) {
            let tmp = GULP_STATES.file_paths.paths[i];
            let aPath;
            try {
                aPath = require(tmp + "src/asset_path.json");
            } catch (err) {
                console.log(err);
            }
            glob(tmp + 'src/js/*.js', (err, files) => {
                if (err) done(err);
                let filesCount = files.length;
                files.map((entry) => {
                    const filename = entry.split('/').pop();
                    tasks.push(
                        browserify({
                            entries: [entry],
                        })
                            .transform('babelify', {
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            useBuiltIns: 'usage',
                                            corejs: 3,
                                        },
                                    ],
                                ],
                            })
                            .bundle()
                            .pipe(plumber())
                            .pipe(source(filename))
                            .pipe(buffer())
                            .pipe(
                                GULP_STATES.type === 'build'
                                    ? uglify({
                                          mangle: false,
                                          keep_fnames: false,
                                      })
                                    : noop()
                            )
                            .pipe(
                                rename({
                                    extname: '.min.js',
                                })
                            )
                            .pipe(plumber.stop())
                            .pipe(replace(/(\.\.\/|\.\/)*is\/images/g, aPath.isLive ? '../../../is/images' : '../../is/images'))
                            .pipe(dest(tmp + 'output/local/js'))
                            .on('end', function () {
                                filesCount--;
                                if (filesCount === 0) {
                                    pathCount--;
                                    if (pathCount === 0) {
                                        done();
                                    }
                                }
                            })
                    );
                });
            });
        }
    } else {
        const livePath = watchPath.split('src/')[0];
        
        let aPath;
		try {
			aPath = require(livePath + "src/asset_path.json");
		} catch (err) {
			console.log('test',err);
		}
        glob(path, (err, files) => {
            if (err) done(err);
            files.map((entry) => {
                const filename = entry.split('/').pop();
                tasks.push(
                    browserify({
                        entries: [entry],
                    })
                        .transform('babelify', {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                    },
                                ],
                            ],
                        })
                        .bundle()
                        .pipe(plumber())
                        .pipe(source(filename))
                        .pipe(buffer())
                        .pipe(
                            rename({
                                extname: '.min.js',
                            })
                        )
                        .pipe(plumber.stop())
                        .pipe(replace(/(\.\.\/|\.\/)*is\/images/g, aPath.isLive ? '../../../is/images' : '../../is/images'))
                        .pipe(replace(/(\.\.\/|\.\/)*is\/content/g, aPath.isLive ? '../../../is/content' : '../../is/content'))
                        .pipe(dest(path.replace('src/js', 'output/local/js').replace(/js.+/g, "$'js")))
                        .on('end', function () {
                            done();
                        })
                );
            });
        });
    }

    mergeStream.apply(null, tasks);
}

function localExport(done) {
    let tasks = [];
    const watchPath = gulp.storage.get('watchPath').replace(/src.+/g, "$'");

    if (watchPath === '') {
        for (let i = 0, pathCount = GULP_STATES.file_paths.paths.length; i < pathCount; i++) {
            let tmp = GULP_STATES.file_paths.paths[i];
            let aPath;
            try {
                aPath = require(tmp + 'src/asset_path.json');
            } catch (err) {
                console.log(err);
            }
            tasks.push(
                src(tmp + 'src/*.html')
                    .pipe(
                        fileinclude({
                            prefix: '@@',
                            basepath: '@file',
                        })
                    )
                    .pipe(replace(/(\.\.\/|\.\/)*is\/images/g, aPath.isLive ? '../../../is/images' : '../../is/images'))
                    .pipe(replace(/(\.\.\/|\.\/)*is\/content/g, aPath.isLive ? '../../../is/content' : '../../is/content'))
                    .pipe(dest(tmp + 'output/local'))
                    .on('end', function () {
                        if (pathCount === i+1) {
                            done();
                        }
                    })
            );
        }
    } else {
        let aPath;
		try {
			aPath = require(watchPath + "src/asset_path.json");
		} catch (err) {
			console.log(err);
		}
        tasks.push(
            src(watchPath + 'src/*.html')
                .pipe(
                    fileinclude({
                        prefix: '@@',
                        basepath: '@file',
                    })
                )
                .pipe(replace(/(\.\.\/|\.\/)*is\/images/g, aPath.isLive ? '../../is/images' : '../../is/images'))
                .pipe(replace(/(\.\.\/|\.\/)*is\/content/g, aPath.isLive ? '../../is/content' : '../../is/content'))
                .pipe(dest(watchPath + 'output/local'))
                .on('end', function () {
                    done();
                })
        );
    }
    mergeStream.apply(null, tasks);
}

function aemExport(done) {
    let tasks = [];
    setTimeout(function(){
        for (let i = 0, pathCount = GULP_STATES.file_paths.paths.length; i < pathCount; i++) {
            let tmp = GULP_STATES.file_paths.paths[i];
            let aPath;
            try {
                aPath = require(tmp + 'src/asset_path.json');
            } catch (err) {
                console.log(err);
            }
            var url = '';
            if (__dirname.indexOf('/') === -1) {
                //window
                url = __dirname + tmp.replace('./', '/').replace('/', '\\') + 'output/local/*.html';
                url = url.replace(/\//g, '\\');
            } else {
                //mac
                url = tmp + 'output/local/*.html';
            }
            
            tasks.push(
                src(url)
                    .pipe(
                        inlinesource({
                            compress: false,
                        })
                    )
                    .pipe(
                        rename({
                            prefix: 'aem_',
                            extname: '.html',
                        })
                    )
                    .pipe(replace(/(\.\.\/|\.\/)*is\/images\//g, aPath.aemImgPath))
                    .pipe(replace(/(\.\.\/|\.\/)*is\/content\//g, aPath.aemContentPath))
                    .pipe(dest(tmp + 'output/aem'))
                    .on('end', function () {
                        if (pathCount === i+1) {
                            done();
                        }
                    })
            );
        }
        mergeStream.apply(null, tasks);
    }, 500)
}

function ftpUpload(done) {
    let tasks = [];
    for (let i = 0, pathCount = GULP_STATES.file_paths.paths.length; i < pathCount; i++) {
        let tmp = GULP_STATES.file_paths.paths[i];
        let aPath;
        try {
            aPath = require(tmp + 'src/asset_path.json');
        } catch (err) {
            console.log(err);
        }

        var url = '';
        if (__dirname.indexOf('/') === -1) {
            //window
            url = __dirname + tmp.replace('./', '/').replace('/', '\\') + 'output/local/*.html';
            url = url.replace(/\//g, '\\');
        } else {
            //mac
            url = tmp + 'output/local/*.html';
        }

        var arrName = tmp.split('/');
        var cate1 = arrName[arrName.length - 4];
        var cate2 = arrName[arrName.length - 3];
        var cate3 = null;
        var name = arrName[arrName.length - 2];
        tmp = './PROJECT/_docs/' + '/' + cate1 + '/' + cate2 + '/' + name;

        if (arrName.length > 6) {
            cate1 = arrName[arrName.length - 5];
            cate2 = arrName[arrName.length - 4];
            cate3 = arrName[arrName.length - 3];
            name = arrName[arrName.length - 2];
            tmp = './PROJECT/_docs/' + '/' + cate1 + '/' + cate2 + '/' + cate3 + '/' + name;
        }

        tasks.push(
            src(url)
                .pipe(
                    inlinesource({
                        compress: false,
                    })
                )
                .pipe(replace(/(\.\.\/|\.\/)*is\/images\//g, aPath.aemImgPath))
                .pipe(replace(/(\.\.\/|\.\/)*is\/content\//g, aPath.aemContentPath))
                .pipe(
                    rename({
                        prefix: 'aem_',
                        extname: '.html',
                    })
                )
                .pipe(dest(tmp))
                .on('end', function () {
                    if (pathCount === i+1) {
                        done();
                    }
                })
        );
    }
    mergeStream.apply(null, tasks);
}

function txtExport(done) {
    let tasks = [];

    setTimeout(function() {
        for (let i = 0, pathCount = GULP_STATES.file_paths.paths.length; i < pathCount; i++) {
            let tmp = GULP_STATES.file_paths.paths[i];
            tasks.push(
                src(tmp + 'output/aem/*.html')
                    .pipe(htmlsplit())
                    .pipe(
                        lec({
                            eolc: 'CRLF',
                            encoding: 'utf8',
                        })
                    )
                    .pipe(dest(tmp + 'output/aem/txt'))
                    .on('end', function () {
                        if (pathCount === i+1) {
                            done();
                        }
                    })
            );
        }
        mergeStream.apply(null, tasks);
    }, 500);
}

function outputClean(done) {
    for (let i = 0, conunt = GULP_STATES.file_paths.paths.length; i < conunt; i++) {
        let tmp = GULP_STATES.file_paths.paths[i];
        del.sync(tmp + 'output/');
    }
    done();
}

function path(done) {
    console.log('filePath', GULP_STATES.file_paths);
    console.log('watchPath', gulp.storage.get('watchPath'));
    done();
}

function typeDev(done) {
    GULP_STATES.type = 'dev';
    done();
}

function typeBuild(done) {
    gulp.storage.set('watchPath', '');
    GULP_STATES.type = 'build';
    done();
}

exports.clean = outputClean;
exports.c = outputClean;

exports.path = path;
exports.p = path;

exports.server = connectServer;
exports.s = connectServer;

exports.dev = series(typeDev, parallel(vwConvert, jsBuild), localExport);
exports.d = series(typeDev, parallel(vwConvert, jsBuild), localExport);
exports.build = series(typeBuild, parallel(series(vwConvert, autoPrefix), jsBuild), localExport, aemExport);
exports.b = series(typeBuild, parallel(series(vwConvert, autoPrefix), jsBuild), localExport, aemExport);

exports.txt = txtExport;
exports.t = txtExport;

exports.all = series(outputClean, typeBuild, parallel(series(vwConvert, autoPrefix), jsBuild), localExport, aemExport, txtExport);
exports.a = series(outputClean, typeBuild, parallel(series(vwConvert, autoPrefix), jsBuild), localExport, aemExport, txtExport);

exports.docs = series(typeBuild, parallel(series(vwConvert, autoPrefix), jsBuild), localExport, aemExport, ftpUpload);

/**
 * note: GULP 명령어
 * 서버띄우기 : gulp server
 * watch : gulp watch
 * 로컬추출 : gulp dev
 * aem추출 : gulp build
 * txt추출 : gulp txt
 */