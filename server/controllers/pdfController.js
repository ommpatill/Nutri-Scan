const PDFDocument = require("pdfkit");
const Result = require("../models/Result");
const User = require("../models/User");

exports.downloadReport = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate("user");

    if (!result || result.user._id.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Result not found." });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=nutriscan_report_${result.deficiency}.pdf`
    );

    doc.pipe(res);

    // PDF Content
    doc
      .fontSize(20)
      .fillColor("#1E40AF")
      .text("NutriScan - Vitamin Deficiency Detection Report", {
        align: "center",
      })
      .moveDown();

    doc
      .fontSize(14)
      .fillColor("black")
      .text(`Name: ${result.user.name}`)
      .text(`Age: ${result.user.age}`)
      .text(`Blood Group: ${result.user.bloodGroup}`)
      .text(`Email: ${result.user.email}`)
      .moveDown();

    doc
      .fontSize(16)
      .fillColor("#DC2626")
      .text(`Prediction: ${result.deficiency}`)
      .text(`Confidence: ${result.confidence}%`)
      .moveDown();

    doc
      .fontSize(12)
      .fillColor("gray")
      .text(`Generated on: ${new Date(result.createdAt).toLocaleString()}`, {
        align: "right",
      });

    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ message: "Failed to generate report." });
  }
};
