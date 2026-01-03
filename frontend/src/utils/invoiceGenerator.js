import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoice = (order) => {
    try {
        const doc = new jsPDF();
        const themeColor = "#1a5d36"; // Green

        // Header
        doc.setFontSize(22);
        doc.setTextColor(themeColor);
        doc.text("TeraFresh", 20, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("Digital Farmers Market", 20, 26);
        doc.text("Email: rs8759652@gmail.com", 20, 31);
        doc.text("Phone: +91 880-990-3280", 20, 36);

        // Invoice Title & Info
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.text("INVOICE", 150, 20);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Invoice #: INV-${order.id.slice(-6).toUpperCase()}`, 150, 28);
        doc.text(`Date: ${order.date}`, 150, 33);
        doc.text(`Time: ${order.time}`, 150, 38);

        // Line
        doc.setDrawColor(200);
        doc.line(20, 45, 190, 45);

        // Bill To
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text("Bill To:", 20, 55);
        doc.setFontSize(10);
        doc.setTextColor(80);

        // Handle address parsing safely
        const addressLines = doc.splitTextToSize(order.deliveryAddress || "", 80);
        doc.text(addressLines, 20, 62);

        // Payment Info
        doc.text(`Payment Method: ${order.paymentMethod?.toUpperCase() || 'N/A'}`, 120, 62);
        doc.text(`Payment Status: ${order.paymentStatus?.toUpperCase() || 'Pending'}`, 120, 67);

        // Items Table
        const tableColumn = ["Item", "Qty", "Price", "Total"];
        const tableRows = [];

        order.items.forEach(item => {
            const itemData = [
                item.name,
                item.qty,
                `INR ${item.price}`,
                `INR ${item.price * item.qty}`
            ];
            tableRows.push(itemData);
        });

        // Use autoTable as a function
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 90,
            theme: 'striped',
            headStyles: { fillColor: themeColor },
            styles: { fontSize: 10, cellPadding: 3 }
        });

        // Totals
        // Provide safe default for finalY if autoTable somehow failed to attach it (though unlikely with function call)
        const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) || 150;

        doc.setFontSize(10);
        doc.text("Subtotal:", 130, finalY + 10);
        doc.text(`INR ${order.total}`, 190, finalY + 10, { align: "right" });

        doc.text("Delivery:", 130, finalY + 17);
        doc.text("INR 0.00", 190, finalY + 17, { align: "right" });

        doc.text("Taxes (5%):", 130, finalY + 24);
        const tax = (order.total * 0.05).toFixed(2);
        doc.text(`INR ${tax}`, 190, finalY + 24, { align: "right" });

        // Divider Line
        doc.setDrawColor(200);
        doc.line(130, finalY + 28, 190, finalY + 28);

        doc.setFontSize(12);
        doc.setTextColor(themeColor);
        doc.setFont("helvetica", "bold");
        doc.text("Grand Total:", 130, finalY + 36);
        doc.text(`INR ${order.total}`, 190, finalY + 36, { align: "right" });

        // Footer
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(150);
        doc.text("Thank you for shopping with FarmFresh!", 105, 280, { align: "center" });

        // Save
        doc.save(`Invoice_${order.id}.pdf`);
    } catch (error) {
        console.error("Invoice generation failed:", error);
        alert(`Failed to generate invoice: ${error.message}`);
    }
};
