(function(){
 'use strict';
 let eventoInstalacao=null;
 const botao=document.getElementById('btnInstalarPwa');
 const ajuda=document.getElementById('pwaInstalarAjuda');
 if(!botao||!ajuda)return;
 const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
 const standalone=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 function instrucoes(){
  if(ios){ajuda.textContent='No iPhone: abra no Safari, toque em Compartilhar (quadrado com seta) e escolha “Adicionar à Tela de Início”.';}
  else {ajuda.textContent='No Android: abra no Chrome, toque no menu ⋮ e escolha “Instalar app” ou “Adicionar à tela inicial”.';}
 }
 if(standalone){botao.hidden=true;ajuda.textContent='Aplicativo já aberto no modo instalado.';return;}
 instrucoes();
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();eventoInstalacao=e;ajuda.textContent='Toque no botão para instalar o aplicativo.';});
 botao.addEventListener('click',async()=>{
  if(!eventoInstalacao){instrucoes();return;}
  const evento=eventoInstalacao;eventoInstalacao=null;
  try{await evento.prompt();const escolha=await evento.userChoice;if(escolha?.outcome==='accepted')ajuda.textContent='Instalação solicitada. Confira a tela inicial do celular.';else instrucoes();}
  catch(e){instrucoes();}
 });
 window.addEventListener('appinstalled',()=>{botao.hidden=true;ajuda.textContent='Aplicativo instalado com sucesso!';eventoInstalacao=null;});
})();
