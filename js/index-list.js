/* 首页列表：把文章日期拆成「日 / 年.月」两行，放到左侧独立日期列
   说明：仅做视觉增强，脚本不执行时列表仍可正常阅读（CSS 有降级布局） */
(function () {
  'use strict';

  function buildDateColumn() {
    var list = document.querySelector('#recent-posts');
    if (!list) return;

    var items = list.querySelectorAll('.recent-post-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.querySelector('.pc-date')) continue;

      var time = item.querySelector('.article-meta-wrap time');
      if (!time) continue;

      // 用显示文本取日期（datetime 是 UTC，直接截取会差一天）
      var text = (time.textContent || '').trim();
      var m = text.match(/(\d{4})\D+(\d{1,2})\D+(\d{1,2})/);
      if (!m) continue;

      var day = m[3].length === 1 ? '0' + m[3] : m[3];
      var month = m[2].length === 1 ? '0' + m[2] : m[2];

      var box = document.createElement('div');
      box.className = 'pc-date';
      box.setAttribute('aria-hidden', 'true');
      box.innerHTML = '<b>' + day + '</b><span>' + m[1] + '.' + month + '</span>';

      item.insertBefore(box, item.firstChild);

      // 原来的日期片段已经搬到左列，隐藏掉避免重复
      // （首页 meta 用 .post-meta-date 包裹，文章页用 .article-meta-item）
      var dateWrap =
        (time.closest && time.closest('.post-meta-date')) ||
        (time.closest && time.closest('.article-meta-item'));
      if (dateWrap) dateWrap.style.display = 'none';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildDateColumn);
  } else {
    buildDateColumn();
  }
})();
