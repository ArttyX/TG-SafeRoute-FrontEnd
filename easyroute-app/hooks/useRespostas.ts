import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Resultado {
  acertos: number;
  total: number;
}

interface UseRespostasProps {
  perguntas: { resposta: string }[];
  cursoId: string;
  moduloId: string;
  email: string;
}

export function useRespostas({ perguntas, cursoId, moduloId, email }: UseRespostasProps) {
  const [respostas, setRespostas] = useState<string[]>([]);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const key = `pontuacoes-${email}`;
      const json = await AsyncStorage.getItem(key);
      const pontuacoes = json ? JSON.parse(json) : {};

      const pontuacaoSalva = pontuacoes?.[cursoId]?.[moduloId];
      if (pontuacaoSalva) {
        setResultado({
          acertos: pontuacaoSalva.pontuacao,
          total: pontuacaoSalva.total,
        });

        if (pontuacaoSalva.respostas) {
          setRespostas(pontuacaoSalva.respostas);
        } else {
          setRespostas(Array(perguntas.length).fill(''));
        }
      } else {
        setRespostas(Array(perguntas.length).fill(''));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const atualizarResposta = (index: number, resposta: string) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = resposta;
    setRespostas(novasRespostas);
  };

  const enviarRespostas = async () => {
    let acertos = 0;
    perguntas.forEach((pergunta, index) => {
      if (respostas[index] === pergunta.resposta) {
        acertos++;
      }
    });

    const resultadoFinal = {
      acertos,
      total: perguntas.length,
    };

    setResultado(resultadoFinal);

    try {
      const key = `pontuacoes-${email}`;
      const json = await AsyncStorage.getItem(key);
      const pontuacoes = json ? JSON.parse(json) : {};

      if (!pontuacoes[cursoId]) pontuacoes[cursoId] = {};
      pontuacoes[cursoId][moduloId] = {
        pontuacao: acertos,
        total: perguntas.length,
        respostas,
        data: new Date().toISOString(),
      };

      await AsyncStorage.setItem(key, JSON.stringify(pontuacoes));
    } catch (error) {
      console.error('Erro ao salvar pontuação:', error);
    }
  };

  return {
    respostas,
    resultado,
    atualizarResposta,
    enviarRespostas,
  };
}
