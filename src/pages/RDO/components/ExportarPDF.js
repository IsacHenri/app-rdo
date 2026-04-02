import jsPDF from "jspdf";
import logo from "../../../assets/img/satel-logo.png";

export default function ExportarPDF({ form }) {

  async function gerarPDF() {

    const doc = new jsPDF("p", "mm", "a4");

    let y = 30;
    let page = 1;

    const marginLeft = 15;
    const marginRight = 195;

    // =========================
    // HEADER PROFISSIONAL
    // =========================
    function header() {

      // LOGO (proporcional)
      doc.addImage(logo, "PNG", 15, 10, 30, 15);

      // TÍTULO
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text("RELATÓRIO DIÁRIO DE OBRA", 105, 16, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("(RDO)", 105, 22, { align: "center" });

      // DATA
      doc.setFontSize(9);
      doc.text(`Data: ${form.data || "-"}`, 195, 15, { align: "right" });

      // LINHA
      doc.setLineWidth(0.5);
      doc.line(marginLeft, 26, marginRight, 26);

      y = 32;
    }

    // =========================
    // FOOTER PROFISSIONAL
    // =========================
    function footer() {

      doc.setLineWidth(0.3);
      doc.line(marginLeft, 285, marginRight, 285);

      doc.setFontSize(9);

      // Página central
      doc.text(`Página ${page}`, 105, 290, { align: "center" });

      // Marca Jaguar (direita)
      doc.setFont("helvetica", "bold");
      doc.text("JaguarSoft", 195, 290, { align: "right" });
    }

    function novaPagina() {
      footer();
      doc.addPage();
      page++;
      header();
    }

    function quebra(linha = 8) {
      if (y + linha > 270) {
        novaPagina();
      }
    }

    // =========================
    // SEÇÃO (COM DESTAQUE)
    // =========================
    function secao(titulo) {

      quebra(12);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);

      doc.setFillColor(240, 240, 240);
      doc.rect(marginLeft, y - 4, 180, 8, "F");

      doc.text(titulo, marginLeft + 2, y);

      y += 8;
    }

    // =========================
    // CAMPO EM DUAS COLUNAS
    // =========================
    function campo2col(label1, val1, label2, val2) {

      quebra();

      doc.setFont("helvetica", "bold");
      doc.text(label1, marginLeft, y);

      doc.setFont("helvetica", "normal");
      doc.text(String(val1 || "-"), marginLeft + 35, y);

      if (label2) {
        doc.setFont("helvetica", "bold");
        doc.text(label2, 110, y);

        doc.setFont("helvetica", "normal");
        doc.text(String(val2 || "-"), 150, y);
      }

      y += 6;
    }

    // =========================
    // TEXTO GRANDE (QUEBRA LINHA)
    // =========================
    function textoGrande(label, valor) {

      quebra(10);

      doc.setFont("helvetica", "bold");
      doc.text(label, marginLeft, y);

      y += 5;

      doc.setFont("helvetica", "normal");

      const texto = doc.splitTextToSize(valor || "-", 180);
      doc.text(texto, marginLeft, y);

      y += texto.length * 5;
    }

    // =========================
    // INÍCIO
    // =========================
    header();

    // =========================
    // 1. IDENTIFICAÇÃO
    // =========================
    secao("1. Identificação");

    campo2col("Obra:", form.obra, "Contrato:", form.contrato);
    campo2col("RDO:", form.rdoNum, "Responsável:", form.responsavel);
    campo2col("Empresa:", form.empresa, "Cliente:", form.cliente);
    campo2col("Data:", form.data, "Dia:", form.diaSemana);

    textoGrande("Endereço:", form.endereco);

    // =========================
    // 2. LOCALIZAÇÃO
    // =========================
    secao("2. Localização");

    campo2col("Latitude:", form.latitude, "Longitude:", form.longitude);

    if (form.latitude && form.longitude) {

      quebra(90);

      const mapUrl = `https://static-maps.yandex.ru/1.x/?lang=pt_BR&ll=${form.longitude},${form.latitude}&z=16&size=650,300&l=map&pt=${form.longitude},${form.latitude},pm2rdm`;

      doc.addImage(mapUrl, "JPEG", marginLeft, y, 180, 80);
      y += 85;
    }

    // =========================
    // 3. CLIMA
    // =========================
    secao("3. Clima");

    campo2col("Clima:", form.clima.join(", "));

    textoGrande("Impacto:", form.impactoClima);

    // =========================
    // 4. MÃO DE OBRA
    // =========================
    secao("4. Mão de Obra");

    form.maoDeObra.forEach(m => {
      campo2col("Função:", m.funcao, "Qtd:", m.qtd);
    });

    // =========================
    // 5. EQUIPAMENTOS
    // =========================
    secao("5. Equipamentos");

    form.equipamentos.forEach(e => {
      campo2col("Equipamento:", e.nome, "Qtd:", e.qtd);
    });

    // =========================
    // 6. ATIVIDADES
    // =========================
    secao("6. Atividades");

    form.atividades.forEach(a => {
      textoGrande("Descrição:", a.desc);
    });

    // =========================
    // 7. OCORRÊNCIAS
    // =========================
    secao("7. Ocorrências");

    campo2col("Tipos:", form.ocorrencias.join(", "));
    textoGrande("Descrição:", form.ocorrenciaDesc);

    // =========================
    // 8. SEGURANÇA
    // =========================
    secao("8. Segurança");

    campo2col("DDS:", form.dds, "Qtd:", form.ddsQtd);
    campo2col("Tema:", form.ddsTema, "EPIs:", form.epis);

    textoGrande("Observações:", form.segObs);

    // =========================
    // 9. OBSERVAÇÕES
    // =========================
    secao("9. Observações");

    textoGrande("Gerais:", form.obsGerais);
    textoGrande("Próximas:", form.proximas);
    textoGrande("Pendentes:", form.pendentes);
    textoGrande("Comunicados:", form.comunicados);

    // =========================
// 10. FOTOS (GRID PROFISSIONAL)
// =========================
secao("10. Fotos");

const imgWidth = 55;
const imgHeight = 40;
const gap = 5;

const pageWidth = 210;
const usableWidth = pageWidth - (marginLeft * 2);
const maxCols = Math.floor(usableWidth / (imgWidth + gap));

let col = 0;
let x = marginLeft;

for (let i = 0; i < form.fotos.length; i++) {

  const foto = form.fotos[i];

  // QUEBRA DE PÁGINA
  if (y + imgHeight > 270) {
    novaPagina();
    y = 30;
    x = marginLeft;
    col = 0;
  }

  try {
    // ✅ CONVERTE FILE → BASE64
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(foto.file);
      reader.onload = () => resolve(reader.result);
    });

    // ✅ DETECTA FORMATO
    let formato = "JPEG";
    if (base64.includes("image/png")) formato = "PNG";
    if (base64.includes("image/webp")) formato = "WEBP";

    doc.addImage(base64, formato, x, y, imgWidth, imgHeight);

  } catch (e) {
    console.error("Erro imagem:", e);
  }

  col++;

  if (col < maxCols) {
    x += imgWidth + gap;
  } else {
    col = 0;
    x = marginLeft;
    y += imgHeight + gap;
  }
}

    // =========================
    // FINAL
    // =========================
    footer();

    doc.save(`RDO_${form.obra || "obra"}.pdf`);
  }

  return (
    <button className="btn-save" onClick={gerarPDF}>
      📄 Exportar PDF Profissional
    </button>
  );
}