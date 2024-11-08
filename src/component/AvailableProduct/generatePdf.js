import jsPDF from 'jspdf';
import "jspdf-autotable";

const generatePdf = (data,store) => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const margin = 10;
    const headerHeight = 20;
    const rowHeight = 20; // Adjust based on your content needs
    let startY = headerHeight + margin; // Position after header
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;


    doc.setFontSize(18);
    doc.text(store.name, margin, 10);

    // Set the first subheading
    doc.setFontSize(12);
    doc.text("Available Products, Dt: "+formattedDate, margin, 18);

    doc.setFontSize(12);
    doc.text("Sl no", margin, startY);
    doc.text("Profile", 20, startY);
    doc.text("Name", 40, startY);
    doc.text("Price", 80, startY);
    doc.text("Brand", 120, startY);
    doc.text("Category", 150, startY);
    doc.text("Quantity", 180, startY);

    startY += rowHeight;

    data.forEach((item, index) => {
        // Check if we need to add a new page
        if (startY + rowHeight > pageHeight - margin) {
            doc.addPage();
            startY = -10;

            // Redraw header on the new page
            doc.setFontSize(12);
            doc.text("Sl no", margin, startY);
            doc.text("Profile", 20, startY);
            doc.text("Name", 40, startY);
            doc.text("Price", 80, startY);
            doc.text("Brand", 120, startY);
            doc.text("Category", 150, startY);
            doc.text("Quantity", 180, startY);

            startY += rowHeight; // Move to the next line after the header
        }

        // Add the item data
        doc.text((index + 1).toString(), margin, startY + 10);
        doc.addImage(`data:image/jpeg;base64,${item.image}`, "JPEG", 20, startY, 10, 10);
        doc.text((item.name).toString(), 40, startY + 10);
        doc.text((item.price).toString(), 80, startY + 10);
        doc.text((item.brand).toString(), 120, startY + 10);
        doc.text((item.category).toString(), 150, startY + 10);
        doc.text((item.quantity).toString(), 180, startY + 10);

        startY += rowHeight; // Move to the next line for the next item
    });

    doc.save(store.name+"_products.pdf");
};

export default generatePdf;