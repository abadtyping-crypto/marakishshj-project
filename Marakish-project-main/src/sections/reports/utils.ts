import dayjs from 'dayjs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface ReportSummary {
  label: string;
  value: any;
  color?: string;
  isBold?: boolean;
}

export const generatePDF = (
  title: string,
  subtitle: string,
  columns: string[],
  data: any[],
  summaries?: ReportSummary[],
  options?: any
) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.width;

  // --- Brand Header ---
  // Background bar at the top
  doc.setFillColor(33, 43, 54);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Marakish Group', 14, 22);

  doc.setFontSize(9);
  doc.setTextColor(145, 158, 171);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${dayjs().format('DD MMM YYYY, HH:mm')}`, pageWidth - 14, 22, { align: 'right' });

  // --- Title Box ---
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(title, 14, 32);

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text(subtitle, 14, 37);

  let currentY = 50;

  // --- Summary Section (Premium Cards) ---
  if (summaries && summaries.length > 0) {
    const spacing = 4;
    const boxWidth = (pageWidth - 28 - (summaries.length - 1) * spacing) / Math.min(summaries.length, 4);

    summaries.forEach((s, i) => {
      const x = 14 + (i % 4) * (boxWidth + spacing);
      const row = Math.floor(i / 4);
      const y = currentY + row * 24;

      // Card Background
      doc.setFillColor(244, 246, 248);
      doc.roundedRect(x, y, boxWidth, 20, 1.5, 1.5, 'F');

      // Accent Line
      doc.setFillColor(33, 43, 54);
      if (s.color === 'green') doc.setFillColor(0, 167, 111); // Modern MUI Green
      if (s.color === 'red') doc.setFillColor(255, 86, 48); // Modern MUI Red
      doc.rect(x, y, 1.5, 20, 'F');

      // Label
      doc.setFontSize(8);
      doc.setTextColor(99, 115, 129);
      doc.setFont('helvetica', 'bold');
      doc.text(s.label.toUpperCase(), x + 4, y + 7);

      // Value
      doc.setFontSize(11);
      doc.setTextColor(33, 43, 54);
      if (s.color === 'green') doc.setTextColor(0, 120, 80);
      if (s.color === 'red') doc.setTextColor(183, 29, 24);
      doc.setFont('helvetica', 'bold');
      doc.text(String(s.value), x + 4, y + 15);
    });

    const rows = Math.ceil(summaries.length / 4);
    currentY += rows * 24 + 5;
  }

  // --- Table ---
  autoTable(doc, {
    startY: currentY,
    head: [columns],
    body: data,
    theme: 'striped',
    headStyles: {
      fillColor: [33, 43, 54],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 4,
    },
    styles: {
      fontSize: 8.5,
      cellPadding: 3.5,
      valign: 'middle',
      textColor: [33, 43, 54],
      lineColor: [230, 230, 230],
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [250, 251, 252],
    },
    columnStyles: {
      // Auto-align numeric columns to right (simple heuristic)
      ...columns.reduce((acc: any, col, idx) => {
        if (col.toLowerCase().includes('price') || col.toLowerCase().includes('amount') || col.toLowerCase().includes('total')) {
          acc[idx] = { halign: 'right' };
        }
        return acc;
      }, {}),
    },
    didParseCell: (dataCell) => {
      if (dataCell.section === 'body') {
        const typeIndex = columns.findIndex(c => c === 'Type');
        if (typeIndex !== -1) {
          const typeValue = dataCell.row.cells[typeIndex].text[0];
          if (typeValue === 'Credit') {
            dataCell.cell.styles.textColor = '#00a76f';
            dataCell.cell.styles.fontStyle = 'bold';
          } else if (typeValue === 'Debit') {
            dataCell.cell.styles.textColor = '#ff5630';
            dataCell.cell.styles.fontStyle = 'bold';
          }
        }
      }
    },
    ...options,
  });

  // --- Footer ---
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(145, 158, 171);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 287, { align: 'center' });
  }

  window.open(doc.output('bloburl'), '_blank');
};
