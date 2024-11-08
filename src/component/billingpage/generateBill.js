import jsPDF from 'jspdf';
import "jspdf-autotable";

const generateBill = (data,store) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const getGrandTotal=(purchaseitemList)=>{
        let total=0;
        purchaseitemList.map(item=>{
          total=total+((item.price*item.quantity) -(((item.price*item.quantity)/100)*item.discount))
        })
        return total;
      }
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const margin = 10;
    const headerHeight = 20;
    const rowHeight = 20; // Adjust based on your content needs
    let startY = headerHeight + margin; // Position after header

    doc.setFontSize(18);
    doc.text(store.name, margin, 10);

    // Set the first subheading
    doc.setFontSize(12);
    doc.text("Date : "+formattedDate, margin, 18);

    doc.setFontSize(12);
    doc.text("Sl", margin, startY);
    doc.text("Image", 20, startY);
    doc.text("Name", 40, startY);
    doc.text("Brand", 60, startY);
    doc.text("Mrp", 90, startY);
    doc.text("Quantity", 120, startY);
    doc.text("Discount", 150, startY);
    doc.text("Amount",180, startY);

    startY += rowHeight;

    data.forEach((item, index) => {
        // Check if we need to add a new page
        if (startY + rowHeight > pageHeight - margin) {
            doc.addPage();
            startY = -10;

            // Redraw header on the new page
            doc.setFontSize(12);
            doc.text("Sl", margin, startY);
            doc.text("Image", 20, startY);
            doc.text("Name", 40, startY);
            doc.text("Brand", 60, startY);
            doc.text("Mrp", 90, startY);
            doc.text("Quantity", 120, startY);
            doc.text("Discount", 150, startY);
            doc.text("Amount", 180, startY);

            startY += rowHeight; // Move to the next line after the header
        }

        // Add the item data
        doc.text((index + 1).toString(), margin, startY + 10);
        doc.addImage(`data:image/jpeg;base64,${item.image}`, "JPEG", 20, startY, 10, 10);
        doc.text((item.name).toString(), 40, startY + 10);
        doc.text((item.brand).toString(), 60, startY + 10);
        doc.text((item.price).toString(), 90, startY + 10);
        doc.text((item.quantity).toString()+(item.sellunit).toString(), 120, startY + 10);
        doc.text((item.discount).toString()+"%", 150, startY + 10);
        doc.text(((item.price*item.quantity) -(((item.price*item.quantity)/100)*item.discount)).toString(), 175, startY + 10);

        startY += rowHeight; // Move to the next line for the next item
    });
    const grandTotal = getGrandTotal(data);
    if (startY + rowHeight > pageHeight - margin) {
        doc.addPage();
        startY = margin;
    }
    doc.setFontSize(14);
    doc.text(`Total Amount: ${grandTotal.toFixed(2)}`, margin, startY + 10);


    doc.save(store.name+"_bill.pdf");
};

export default generateBill;