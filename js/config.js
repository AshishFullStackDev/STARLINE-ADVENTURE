// STARLINE ADVENTURES - UNIFIED CONFIGURATION
// Use this file to maintain consistent company information across all pages

const STARLINE_CONFIG = {
    // Company Information
    companyName: 'STARLINE ADVENTURES PVT LTD',
    tagline: 'Adventure Equipment Manufacturer & Installation Expert',
    description: 'Professional adventure equipment, adventure park design, manufacturing and installation across India.',
    
    // Contact Information
    contactPhone: '+91 94249 04000',
    contactEmail: 'info@starlineadventure.com',
    whatsappNumber: '+919424904000',
    whatsappMessage: 'Hello STARLINE ADVENTURES, I am interested in your adventure rides and would like more information.',
    
    // Address
    address: {
        street: 'Katol',
        city: 'Nagpur',
        state: 'Maharashtra',
        country: 'India',
        postalCode: ''
    },
    addressDisplay: 'Katol, Nagpur, Maharashtra, India',
    addressFormatted: 'Nagpur, Maharashtra, India',
    
    // GST (placeholder - update with actual GST number)
    gstNumber: '27XXXXX1234X1ZX',
    
    // Year for copyright
    copyrightYear: new Date().getFullYear(),
    
    // URLs
    mapsLink: 'https://maps.app.goo.gl/ZfGAxr5sR2J8ZRk66',
    
    // Website metadata
    websiteUrl: 'https://starlineadventures.com', // Update with actual domain
    
    // Social Media (only add verified URLs)
    socialMedia: {
        facebook: null,
        instagram: null,
        youtube: null,
        linkedin: null
    },
    
    // Function to get WhatsApp link
    getWhatsAppLink: function(customMessage = null) {
        const message = customMessage || this.whatsappMessage;
        return `https://wa.me/${this.whatsappNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;
    },
    
    // Function to get phone link
    getPhoneLink: function() {
        return `tel:${this.contactPhone}`;
    },
    
    // Function to get email link
    getEmailLink: function() {
        return `mailto:${this.contactEmail}`;
    },
    
    // Function to get WhatsApp link for product enquiry
    getProductWhatsAppLink: function(productName) {
        const message = `Hello STARLINE ADVENTURES, I would like a quote for ${productName}.`;
        return this.getWhatsAppLink(message);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = STARLINE_CONFIG;
}
