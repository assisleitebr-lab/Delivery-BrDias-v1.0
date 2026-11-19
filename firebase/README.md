# Configuração Firebase

1. No Firebase Console, ative Authentication > Sign-in method > Email/Password.
2. Crie o Cloud Firestore Database.
3. Publique `firestore.rules` em Firestore > Rules.
4. Configure Firebase Storage e publique `storage.rules`.
5. O domínio `SEU_USUARIO.github.io` precisa estar em Authentication > Settings > Authorized domains.

## Criar o primeiro administrador
Cadastre-se normalmente pelo site. Em Authentication > Users copie o UID. No Firestore, abra `profiles`, localize o documento com esse UID e altere `role` de `cliente` para `admin`. Faça isso somente pelo console. Para motoboy, crie o usuário por fluxo administrativo confiável e crie seu documento de perfil com `role: motoboy`.

A configuração web está em `js/config.js`. A API key web não é senha; a proteção depende das regras do Firestore/Storage e das permissões. Nunca publique credenciais privadas ou service account.

**Estado:** cadastro/login e criação/leitura básica de perfis conectados ao Firebase. Cardápio dinâmico, carrinho, checkout, pedidos, atribuição de entregas, painel administrativo completo e relatórios ainda não foram implementados. Não usar para pedidos reais ainda.
