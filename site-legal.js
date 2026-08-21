(function () {
  'use strict';

  const PRIVACY_URL = '/privacy-policy.html';
  const TERMS_URL = '/terms-of-use.html';
  const NOTICE_KEY = 'forge_privacy_notice_ack_v1';

  function addStyles() {
    if (document.getElementById('forge-legal-styles')) return;
    const style = document.createElement('style');
    style.id = 'forge-legal-styles';
    style.textContent = `
      .forge-legal-links{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;width:100%;margin-top:8px;font-size:12px;color:#8d8d8d}
      .forge-legal-links a{color:#aaa;text-decoration:none}
      .forge-legal-links a:hover,.forge-legal-links a:focus{color:#fff;text-decoration:underline}
      .forge-legal-sep{color:#555}
      #forge-privacy-notice{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:980px;margin:0 auto;background:rgba(8,8,8,.98);color:#f5f5f5;border:1px solid #333;border-left:5px solid #f51d2b;box-shadow:0 16px 50px rgba(0,0,0,.55);padding:16px 18px;border-radius:10px;font-family:Arial,Helvetica,sans-serif}
      #forge-privacy-notice .forge-notice-inner{display:flex;align-items:center;justify-content:space-between;gap:18px}
      #forge-privacy-notice p{margin:0;color:#ddd;font-size:13px;line-height:1.55}
      #forge-privacy-notice a{color:#fff;font-weight:700}
      #forge-privacy-notice button{flex:0 0 auto;border:0;border-radius:7px;background:#f51d2b;color:#fff;padding:11px 18px;font-size:12px;font-weight:900;letter-spacing:.08em;cursor:pointer}
      #forge-privacy-notice button:hover,#forge-privacy-notice button:focus{background:#d81926}
      @media(max-width:640px){#forge-privacy-notice{left:10px;right:10px;bottom:10px;padding:15px}#forge-privacy-notice .forge-notice-inner{align-items:stretch;flex-direction:column}#forge-privacy-notice button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function addFooterLinks() {
    if (document.querySelector('.forge-legal-links')) return;
    const footer = document.querySelector('footer');
    if (!footer) return;

    const links = document.createElement('div');
    links.className = 'forge-legal-links';
    links.innerHTML = `<a href="${PRIVACY_URL}">Privacy Policy</a><span class="forge-legal-sep">•</span><a href="${TERMS_URL}">Terms of Use</a>`;

    const preferred = footer.querySelector('.footer-grid, .footer-row, .container');
    (preferred || footer).appendChild(links);
  }

  function showPrivacyNotice() {
    try {
      if (localStorage.getItem(NOTICE_KEY) === '1') return;
    } catch (_) {}

    if (document.getElementById('forge-privacy-notice')) return;
    const notice = document.createElement('div');
    notice.id = 'forge-privacy-notice';
    notice.setAttribute('role', 'dialog');
    notice.setAttribute('aria-label', 'Website privacy notice');
    notice.innerHTML = `
      <div class="forge-notice-inner">
        <p><strong>We value your privacy.</strong> The Forge uses essential cookies and similar technologies for website security and functionality. We do not use cookies for advertising. See our <a href="${PRIVACY_URL}">Privacy Policy</a> for details.</p>
        <button type="button" id="forge-privacy-got-it">GOT IT</button>
      </div>`;
    document.body.appendChild(notice);

    document.getElementById('forge-privacy-got-it')?.addEventListener('click', function () {
      try { localStorage.setItem(NOTICE_KEY, '1'); } catch (_) {}
      notice.remove();
    });
  }

  function init() {
    addStyles();
    addFooterLinks();
    showPrivacyNotice();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
