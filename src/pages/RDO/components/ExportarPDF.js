import jsPDF from "jspdf";
import logo from "../../../assets/img/satel-logo.jpeg";

export default function ExportarPDF({ form }) {

  async function gerarPDF() {

    const doc = new jsPDF();
    let y = 30;
    let page = 1;

    // =========================
    // HEADER (todas páginas)
    // =========================
    function header() {
      doc.addImage(logo, "JPEG", 10, 10, 25, 15);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("RELATÓRIO DIÁRIO DE OBRA (RDO)", 105, 18, { align: "center" });

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Data: ${form.data || "-"}`, 160, 15);

      doc.setLineWidth(0.5);
      doc.line(10, 25, 200, 25);

      y = 30;
    }

    // =========================
    // FOOTER (todas páginas)
    // =========================
    function footer() {
      doc.setFontSize(9);
      doc.text(`Página ${page}`, 105, 290, { align: "center" });

      doc.text("JaguarSoft - Sistema de Gestão de Obras", 10, 290);
    }

    // =========================
    function novaPagina() {
      footer();
      doc.addPage();
      page++;
      header();
    }

    function quebra() {
      if (y > 270) {
        novaPagina();
      }
    }

    function secao(titulo) {
      quebra();

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(titulo, 10, y);
      y += 8;

      doc.setLineWidth(0.3);
      doc.line(10, y, 200, y);
      y += 6;
    }

    function campo(label, valor) {
      quebra();

      doc.setFont("helvetica", "bold");
      doc.text(label, 10, y);

      doc.setFont("helvetica", "normal");
      doc.text(String(valor || "-"), 70, y);

      y += 6;
    }

    // =========================
    // INÍCIO
    // =========================
    header();

    // =========================
    // IDENTIFICAÇÃO
    // =========================
    secao("1. Identificação");

    campo("Obra:", form.obra);
    campo("Contrato:", form.contrato);
    campo("RDO:", form.rdoNum);
    campo("Responsável:", form.responsavel);
    campo("Empresa:", form.empresa);
    campo("Cliente:", form.cliente);
    campo("Endereço:", form.endereco);
    campo("Data:", form.data);
    campo("Dia:", form.diaSemana);

    // =========================
    // LOCALIZAÇÃO
    // =========================
    secao("2. Localização");

    campo("Latitude:", form.latitude);
    campo("Longitude:", form.longitude);

    if (form.latitude && form.longitude) {
      quebra();

      const mapUrl = `https://static-maps.yandex.ru/1.x/?lang=pt_BR&ll=${form.longitude},${form.latitude}&z=16&size=600,300&l=map&pt=${form.longitude},${form.latitude},pm2rdm`;

      doc.addImage(mapUrl, "JPEG", 10, y, 190, 80);
      y += 85;
    }

    // =========================
    // CLIMA
    // =========================
    secao("3. Clima");

    campo("Temp Min:", form.tempMin);
    campo("Temp Max:", form.tempMax);
    campo("Umidade:", form.umidade);
    campo("Clima:", form.clima.join(", "));

    // =========================
    // MÃO DE OBRA
    // =========================
    secao("4. Mão de Obra");

    form.maoDeObra.forEach(m => {
      campo("Nome:", m.nome);
      campo("Função:", m.funcao);
      campo("Qtd:", m.qtd);
      y += 2;
    });

    // =========================
    // EQUIPAMENTOS
    // =========================
    secao("5. Equipamentos");

    form.equipamentos.forEach(e => {
      campo("Equipamento:", e.nome);
      campo("Qtd:", e.qtd);
      y += 2;
    });

    // =========================
    // ATIVIDADES
    // =========================
    secao("6. Atividades");

    form.atividades.forEach(a => {
      campo("-", a);
    });

    // =========================
    // OCORRÊNCIAS
    // =========================
    secao("7. Ocorrências");

    campo("Tipos:", form.ocorrencias.join(", "));
    campo("Descrição:", form.ocorrenciaDesc);

    // =========================
    // SEGURANÇA
    // =========================
    secao("8. Segurança");

    campo("DDS:", form.dds);
    campo("Qtd DDS:", form.ddsQtd);
    campo("Tema DDS:", form.ddsTema);
    campo("EPIs:", form.epis);
    campo("Obs:", form.segObs);

    // =========================
    // OBSERVAÇÕES
    // =========================
    secao("9. Observações");

    campo("Gerais:", form.obsGerais);
    campo("Próximas:", form.proximas);
    campo("Pendentes:", form.pendentes);
    campo("Comunicados:", form.comunicados);

    // =========================
    // FOTOS (GRID PROFISSIONAL)
    // =========================
    secao("10. Fotos");

    let x = 10;
    let col = 0;

    for (let i = 0; i < form.fotos.length; i++) {

      if (y > 240) {
        novaPagina();
        y = 30;
      }

      doc.addImage(form.fotos[i].url, "JPEG", x, y, 60, 45);

      col++;
      x += 65;

      if (col === 3) {
        col = 0;
        x = 10;
        y += 50;
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