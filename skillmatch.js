class Candidato {
  constructor(nome, areaInteresse, habilidades, experiencia) {
    this.nome = nome;
    this.areaInteresse = areaInteresse;
    this.habilidades = habilidades;
    this.experiencia = experiencia;
  }
}

const candidato = new Candidato(
  "Alison Diego",
  "Front-End",
  ["HTML", "CSS", "JavaScript", "Git"],
  "1 ano"
);

class Vaga {
  constructor(empresa, cargo, requisitos) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
  }

  obterResumo() {
    return `${this.cargo} na ${this.empresa} (Requisitos: ${this.requisitos.join(", ")})`;
  }
}

class VagaRemota extends Vaga {
  constructor(empresa, cargo, requisitos, fusoHorario) {
    super(empresa, cargo, requisitos);
    this.fusoHorario = fusoHorario;
  }

  obterResumo() {
    return `${super.obterResumo()} - Remoto (${this.fusoHorario})`;
  }
}

const vagasBancoDados = [
  new Vaga("Tech Solutions", "Dev Front-End Jr", ["HTML", "CSS", "JavaScript"]),
  new VagaRemota("StartUp Web", "Desenvolvedor React Jr", ["HTML", "CSS", "JavaScript", "Git", "React"], "BRT (GMT-3)"),
  new Vaga("CodeLab", "Estagiário Front-End", ["HTML", "CSS"]),
  new VagaRemota("CloudTech", "Front-End Engineer Jr", ["HTML", "CSS", "JavaScript", "TypeScript", "Vue.js"], "EST (GMT-5)")
];

function criarContadorAnalises() {
  let totalAnalises = 0;
  return function () {
    totalAnalises++;
    return totalAnalises;
  };
}
const incrementarAnalise = criarContadorAnalises();

function formatarRecomendacao(habilidadesFaltantes, formatadorCallback) {
  if (habilidadesFaltantes.length === 0) {
    return "Parabéns! Você atende a 100% dos requisitos exigidos para esta vaga.";
  }
  return formatadorCallback(habilidadesFaltantes);
}

const priorizarEstudo = (faltantes) => {
  const prioridade = faltantes[0];
  return `Prioridade de Estudo: Foque primeiro em [${prioridade}]. Habilidades a desenvolver: ${faltantes.join(", ")}.`;
};

function analisarVaga(vaga, candidato) {
  const requisitosAtendidos = vaga.requisitos.filter(req =>
    candidato.habilidades.includes(req)
  );

  const habilidadesFaltantes = vaga.requisitos.filter(req =>
    !candidato.habilidades.includes(req)
  );

  const percentual = Math.round((requisitosAtendidos.length / vaga.requisitos.length) * 100);

  let classificacao = "";
  if (percentual >= 80) {
    classificacao = "Alta compatibilidade";
  } else if (percentual >= 50) {
    classificacao = "Média compatibilidade";
  } else {
    classificacao = "Baixa compatibilidade";
  }

  const recomendacao = formatarRecomendacao(habilidadesFaltantes, priorizarEstudo);

  return {
    vaga,
    percentual,
    classificacao,
    habilidadesFaltantes,
    recomendacao
  };
}

function buscarVagasServidor() {
  return new Promise((resolve, reject) => {
    console.log("Conectando ao servidor e buscando vagas...");
    setTimeout(() => {
      const sucessoConexao = true;
      if (sucessoConexao) {
        resolve(vagasBancoDados);
      } else {
        reject("Falha ao conectar ao servidor de vagas.");
      }
    }, 1500);
  });
}

async function executarSistema() {
  try {
    console.log("==========================================");
    console.log("   SKILLMATCH JS - SISTEMA DE COMPATIBILIDADE");
    console.log("==========================================");

    console.log("\n--- PERFIL DO CANDIDATO ---");
    console.log(`Nome: ${candidato.nome}`);
    console.log(`Área: ${candidato.areaInteresse}`);
    console.log(`Habilidades: ${candidato.habilidades.join(", ")}`);
    console.log(`Experiência: ${candidato.experiencia}`);

    console.log("\n--- BUSCANDO VAGAS DO SERVIDOR ---");
    const vagas = await buscarVagasServidor();

    console.log("\n--- ANÁLISE DE COMPATIBILIDADE ---");

    const relatorio = vagas.map(vaga => {
      incrementarAnalise();
      return analisarVaga(vaga, candidato);
    });

    relatorio.forEach(item => {
      console.log(`\n📌 Vaga: ${item.vaga.obterResumo()}`);
      console.log(`   Compatibilidade: ${item.percentual}% (${item.classificacao})`);
      console.log(`   Habilidades Faltantes: ${item.habilidadesFaltantes.length > 0 ? item.habilidadesFaltantes.join(", ") : "Nenhuma"}`);
      console.log(`   💡 ${item.recomendacao}`);
    });

    const vagaMaisCompativel = relatorio.reduce((maior, atual) => {
      return atual.percentual > maior.percentual ? atual : maior;
    });

    console.log("\n==========================================");
    console.log("🏆 VAGA COM MAIOR COMPATIBILIDADE:");
    console.log(`   ${vagaMaisCompativel.vaga.cargo} na ${vagaMaisCompativel.vaga.empresa}`);
    console.log(`   Aderência: ${vagaMaisCompativel.percentual}% (${vagaMaisCompativel.classificacao})`);
    console.log(`\nTotal de análises executadas: ${incrementarAnalise() - 1}`);
    console.log("==========================================");

  } catch (erro) {
    console.error("\n❌ ERRO NO SISTEMA:", erro);
  }
}

executarSistema();