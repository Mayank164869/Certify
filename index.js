const generatePDF = async (name) => {
  const { PDFDocument, rgb } = PDFLib;

  const exBytes = await fetch("./certificates/cert1.pdf").then((res) => {
    return res.arrayBuffer();
  });

  const exfont = await fetch("./Fonts/DancingScript-Bold.ttf").then(res => {
    return res.arrayBuffer()
  });

  // console.log(exBytes)
  const pdfDoc = await PDFDocument.load(exBytes)
  pdfDoc.registerFontkit(fontkit);
  const myFont = await pdfDoc.embedFont(exfont);

  const pages = pdfDoc.getPages();
  const pg1 = pages[0];
  pg1.drawText(name, {
    x: 70,
    y: 300,
    size: 100,
    font: myFont,
    color: rgb(0,0,0)
  })
  const uri = await pdfDoc.saveAsBase64({ dataUri: true })
  // // console.log(uri)
  // // window.open(uri)
  // saveAs(uri, "Padhega India Certificate.pdf", { autoBom: true })
  document.querySelector("#mypdf").src = uri;
};

const subBTN = document.getElementById("submit");
const inputVal = document.querySelector("#name");

subBTN.addEventListener("click", () => {
  const val = inputVal.value;
  generatePDF(val)
})

generatePDF(val)