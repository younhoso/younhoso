import { PT_STATE, util as _} from './bs_common';

export const copy = {
  click() {
      const target = new ClipboardJS('[data-role="btnCopy"]');
      const $alertMsg = $('.alert_msg');

      target.on('success', function () {
          $alertMsg.fadeIn();
          setTimeout(function () {
              $alertMsg.fadeOut();
          }, 2800);
        //   target.clearSelection();
        
      });
      target.on('error', function () {
          prompt('', target.data('clipboard-text'));
      });

      PT_STATE.$PROJECT.off('click.clickCopy').on('click.clickCopy', '[data-role="btnCopy"]', function (e) {
          e.preventDefault();
          const msg = $(this).data('alertMsg');

          if (msg) {
              $alertMsg.text(msg);
          } else {
              $alertMsg.text('해시태그가 복사되었습니다.');
          }
      });
  },
};