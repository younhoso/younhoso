import { PT_STATE, util as _ } from './modules/bs_common';
import { component_tab } from './modules/component_tab';
import { anchor } from './modules/anchor';

$(document).ready(function(){
    anchor.click([
        {
            el: '[data-role-anchor="pt_notice"]',
            target: '.sec_notice',
        },
    ]);

    function lozadEvt(){
        const observerbg = lozad('.pt_bg-image', {
            loaded: function(el) {
                el.classList.add('pt_add-bg');
            }
        });
        observerbg.observe();
    }

    component_tab.init();
    lozadEvt();
    viewportChange(); // fold 해상도 대응
});
