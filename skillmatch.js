
class Candidato {
  constructor(nome, areaInteresse, habilidades, experiencia) {
    this.nome = nome;
    this.areaInteresse = areaInteresse;
    this.habilidades = habilidades;
    this.experiencia = experiencia;
  }
}

// Instância do candidato com seus dados reais (RF01)
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
  new Vaga("CodeLab", "Estagiário Front-End", ["HTML", "CSS"])
];


function buscarVagasServidor() {
  return new Promise((resolve, reject) => {
    console.log("Conectando ao servidor...");
    
    
    setTimeout(() => {
      const sucessoConexao = true; // Altere para false para testar o tratamento de erro
      
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
    console.log("=== SKILLMATCH JS - SISTEMA INICIADO ===");
    console.log("\n--- PERFIL DO CANDIDATO ---");
    console.log(`Nome: ${candidato.nome}`);
    console.log(`Área: ${candidato.areaInteresse}`);
    console.log(`Habilidades: ${candidato.habilidades.join(", ")}`);
    console.log(`Experiência: ${candidato.experiencia}`);

    console.log("\n--- BUSCANDO VAGAS ---");
    const vagasCarregadas = await buscarVagasServidor();

    console.log("\n--- VAGAS ENCONTRADAS ---");
    vagasCarregadas.forEach(vaga => console.log(vaga.obterResumo()));

  } catch (erro) {
    console.error("\n❌ ERRO NO SISTEMA:", erro);
  }
}


executarSistema();