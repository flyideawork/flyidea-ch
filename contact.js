(() => {
  const address = ['in', 'fo'].join('') + String.fromCharCode(64) + ['fly', 'idea'].join('') + '.' + 'ch';
  const setup = () => {
    document.querySelectorAll('[data-email-address]').forEach(node => { node.textContent = address; });
    document.querySelectorAll('[data-email-contact]').forEach(link => {
      const subject = link.dataset.emailSubject;
      link.href = 'mailto:' + address + (subject ? '?subject=' + subject : '');
    });
    document.querySelectorAll('[data-copy-email]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', async () => {
        const status = button.parentElement.querySelector('[role="status"]');
        try {
          await navigator.clipboard.writeText(address);
          if (status) status.textContent = 'Kopiert';
          setTimeout(() => { if (status) status.textContent = ''; }, 2500);
        } catch {
          const label = button.closest('.contact-actions')?.querySelector('[data-email-address]');
          if (label) {
            const range = document.createRange();
            range.selectNodeContents(label);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
          if (status) status.textContent = 'Adresse markiert. Jetzt kopieren.';
        }
      });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, {once:true});
  else setup();
})();
