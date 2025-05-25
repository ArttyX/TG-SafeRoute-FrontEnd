import AsyncStorage from '@react-native-async-storage/async-storage';
import { cursosData } from './cursos';

const PROGRESS_KEY = '@user_course_progress';

type ProgressoUsuario = {
  [cursoKey: string]: {
    [moduloIndex: string]: {
      questoesRespondidas: {
        [questaoId: string]: boolean;
      };
      concluido: boolean;
    };
  };
};

// Recupera progresso completo
export const getUserProgress = async (): Promise<ProgressoUsuario> => {
  const data = await AsyncStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
};

// Salva progresso completo
export const saveUserProgress = async (progress: ProgressoUsuario) => {
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

// Marca uma questão como respondida
export const marcarQuestaoRespondida = async (
  cursoKey: string,
  moduloIndex: number,
  questaoId: number
) => {
  const progresso = await getUserProgress();

  if (!progresso[cursoKey]) progresso[cursoKey] = {};
  if (!progresso[cursoKey][moduloIndex]) {
    progresso[cursoKey][moduloIndex] = { questoesRespondidas: {}, concluido: false };
  }

  progresso[cursoKey][moduloIndex].questoesRespondidas[questaoId] = true;

  await saveUserProgress(progresso);
};

// Verifica se um módulo está concluído
export const verificarConclusaoModulo = async (cursoKey: string, moduloIndex: number) => {
  const curso = cursosData[cursoKey];
  if (!curso) return;

  const modulo = curso.modulos[moduloIndex];
  if (!modulo) return;

  const progresso = await getUserProgress();

  const respondidas = progresso[cursoKey]?.[moduloIndex]?.questoesRespondidas || {};
  const totalQuestoes = modulo.perguntas.length;

  const respondidasCount = Object.values(respondidas).filter(Boolean).length;

  if (respondidasCount === totalQuestoes) {
    progresso[cursoKey][moduloIndex].concluido = true;
    await saveUserProgress(progresso);
  }
};

// Obtém o progresso do módulo (0–100%)
export const getProgressoDoModulo = async (
  cursoKey: string,
  moduloIndex: number
): Promise<number> => {
  const curso = cursosData[cursoKey];
  if (!curso) return 0;

  const modulo = curso.modulos[moduloIndex];
  if (!modulo) return 0;

  const progresso = await getUserProgress();
  const respondidas = progresso[cursoKey]?.[moduloIndex]?.questoesRespondidas || {};
  const totalQuestoes = modulo.perguntas.length;

  const respondidasCount = Object.values(respondidas).filter(Boolean).length;

  return Math.floor((respondidasCount / totalQuestoes) * 100);
};

// Retorna módulos concluídos
export const getModulosConcluidos = async (cursoKey: string): Promise<number[]> => {
  const progresso = await getUserProgress();
  const modulos = progresso[cursoKey] || {};

  return Object.entries(modulos)
    .filter(([_, data]) => data.concluido)
    .map(([moduloIndex]) => Number(moduloIndex));
};

// Reseta o progresso (opcional)
export const resetProgresso = async () => {
  await AsyncStorage.removeItem(PROGRESS_KEY);
};
