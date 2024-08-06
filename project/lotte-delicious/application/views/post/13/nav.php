<!-- PC 네비게이션 영역 관한 코드 -->
<div class="nav">
    <?php
    // 카테고리 배열 생성
    $categories = array('sport', 'trip', 'food', 'style', 'culture');
    
    // 현재 주소의 경로 가져오기
    $current_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    
    // 현재 주소의 경로에서 카테고리를 추출하여 현재 카테고리 변수에 할당
    $current_category = '';
    foreach ($categories as $category) {
        if (strpos($current_path, "/post/$category/") !== false) {
            $current_category = $category;
            break;
        }
    }
    
    // 각 카테고리에 대한 링크 생성
    foreach ($categories as $category) {
        $active_class = ($category === $current_category) ? 'active' : '';
        ?>
        <a href="/post/<?= $category ?>/<?= $this->round ?>" class="nav-link <?= $active_class ?>">
            <img class="pc" src="/assets/imgs/round/13/post/<?= ($category === $current_category) ? $category : $category ?>.webp" alt="<?= $category ?>"/>
            <img class="mo" src="/assets/imgs/round/13/post/<?= ($category === $current_category) ? $category : $category ?>.webp" alt="<?= $category ?>"/>
            <div><?= strtoupper($category) ?></div>
        </a>
    <?php } ?>
</div>
