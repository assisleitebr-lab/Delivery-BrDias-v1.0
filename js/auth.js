document.addEventListener("DOMContentLoaded", () => {
  const auth=window.auth, db=window.db, msg=document.getElementById("message");
  const say=t=>{if(msg)msg.textContent=t;};
  const login=document.getElementById("loginForm");
  if(login) login.addEventListener("submit",async e=>{e.preventDefault();try{
    const c=await auth.signInWithEmailAndPassword(document.getElementById("email").value.trim(),document.getElementById("password").value);
    const snap=await db.collection("profiles").doc(c.user.uid).get();
    if(!snap.exists){await auth.signOut();return say("Perfil não encontrado. Contate a loja.");}
    const p=snap.data(); if(p.active===false){await auth.signOut();return say("Conta desativada.");}
    location.href=p.role==="admin"?"admin.html":p.role==="motoboy"?"motoboy.html":"cliente.html";
  }catch(x){say(fbError(x));}});
  const signup=document.getElementById("signupForm");
  if(signup) signup.addEventListener("submit",async e=>{e.preventDefault();try{
    const c=await auth.createUserWithEmailAndPassword(document.getElementById("email").value.trim(),document.getElementById("password").value);
    await db.collection("profiles").doc(c.user.uid).set({
      fullName:document.getElementById("name").value.trim(),phone:document.getElementById("phone").value.trim(),
      address:document.getElementById("address").value.trim(),addressNumber:document.getElementById("number").value.trim(),
      neighborhood:document.getElementById("neighborhood").value.trim(),reference:document.getElementById("reference").value.trim(),
      role:"cliente",active:true,createdAt:firebase.firestore.FieldValue.serverTimestamp()
    });
    say("Cadastro realizado!");location.href="cliente.html";
  }catch(x){say(fbError(x));}});
  const logout=document.getElementById("logout");
  if(logout)logout.addEventListener("click",async()=>{await auth.signOut();location.href="index.html";});
  const page=location.pathname.split('/').pop();
  if(["cliente.html","motoboy.html","admin.html"].includes(page)) auth.onAuthStateChanged(async user=>{
    if(!user)return location.replace("login.html");
    try{const s=await db.collection("profiles").doc(user.uid).get();if(!s.exists)return location.replace("login.html");
      const role=s.data().role,ok=page==="admin.html"?role==="admin":page==="motoboy.html"?role==="motoboy":role==="cliente"||role==="admin";
      if(!ok)location.replace(role==="admin"?"admin.html":role==="motoboy"?"motoboy.html":"cliente.html");
    }catch(err){console.error(err);say("Falha ao validar acesso. Confira as regras do Firebase.");}
  });
});
function fbError(e){const m={"auth/email-already-in-use":"Este e-mail já está cadastrado.","auth/invalid-email":"E-mail inválido.","auth/weak-password":"A senha precisa ter pelo menos 6 caracteres.","auth/invalid-credential":"E-mail ou senha incorretos.","auth/too-many-requests":"Muitas tentativas. Tente mais tarde."};return m[e.code]||e.message||"Erro inesperado.";}
