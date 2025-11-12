interface InvoiceData {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    discount?: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  totalAmount: number;
  orderDate: string;
  status: string;
}

export async function generateInvoicePDF(
  elementId: string,
  invoiceData: InvoiceData
): Promise<void> {
  // Dynamically import html2pdf to keep bundle size small
  const html2pdf = (await import("html2pdf.js")).default;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Invoice element not found");
    return;
  }

  const options = {
    margin: 10,
    filename: `Invoice_${invoiceData.orderId}_${new Date().getTime()}.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4" },
  };

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;

  // Hide non-printable elements in the clone
  const tabButtons = clonedElement.querySelectorAll("button");
  tabButtons.forEach((btn) => {
    btn.style.display = "none";
  });

  try {
    await html2pdf().set(options).from(clonedElement).save();
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate invoice PDF");
  }
}
