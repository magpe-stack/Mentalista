/* Mentalista v48.1 — comandos de Exibir, reaproveitando os controles existentes. */
(()=>{'use strict';
 const bind=(id,original)=>document.getElementById(id)?.addEventListener('click',()=>document.getElementById(original)?.click());
 bind('viewThemeToggle','themeQuick');bind('viewAppearanceSettings','openSettings');
 bind('viewPointer','pointerMode');bind('viewHand','handMode');
 const setMode=dark=>{const isDark=!document.body.classList.contains('light');if(isDark!==dark)document.getElementById('themeQuick')?.click()};
 document.getElementById('viewThemeLight')?.addEventListener('click',()=>setMode(false));
 document.getElementById('viewThemeDark')?.addEventListener('click',()=>setMode(true));
})();
