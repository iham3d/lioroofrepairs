export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    message: string;
    honeypot?: string; // Spam prevention
}

export interface ContactSubmission {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    message: string;
    status: 'NEW' | 'CONTACTED' | 'COMPLETED';
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: number;
    name: string;
    location: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
}

export interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    category: string;
}
