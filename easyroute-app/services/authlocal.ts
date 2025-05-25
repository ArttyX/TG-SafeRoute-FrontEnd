import AsyncStorage from '@react-native-async-storage/async-storage';

export async function registrarUsuario(email: string, senha: string, nome: string, foto: string | null = null) {
  const usuarioExistente = await AsyncStorage.getItem(`usuario-${email}`);

  if (usuarioExistente) {
    const error = new Error('Usuário já cadastrado');
    (error as any).code = 'auth/email-already-in-use';
    throw error;
  }

  const novoUsuario = { email, senha, nome, foto };
  await AsyncStorage.setItem(`usuario-${email}`, JSON.stringify(novoUsuario));
  await AsyncStorage.setItem('usuarioLogado', email); // salvar login automático

  return novoUsuario;
}


export async function loginUsuario(email: string, senha: string) {
  const usuarioSalvo = await AsyncStorage.getItem(`usuario-${email}`);

  if (!usuarioSalvo) {
    const error = new Error('Usuário não encontrado');
    (error as any).code = 'auth/user-not-found';
    throw error;
  }

  const dados = JSON.parse(usuarioSalvo);
  if (dados.senha !== senha) {
    const error = new Error('Senha incorreta');
    (error as any).code = 'auth/wrong-password';
    throw error;
  }

  await AsyncStorage.setItem('usuarioLogado', email); // salvar login automático
  return dados;
}


export async function obterPerfilUsuarioLogado() {
  const email = await AsyncStorage.getItem('usuarioLogado');
  if (!email) throw new Error('Nenhum usuário logado');

  const usuarioSalvo = await AsyncStorage.getItem(`usuario-${email}`);
  if (!usuarioSalvo) throw new Error('Dados do usuário não encontrados');

  return JSON.parse(usuarioSalvo); // retorna { nome, email, senha, foto }
}


