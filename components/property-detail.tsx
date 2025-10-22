import { Heart, MapPin, Bed, Bath, Square, Calendar, User, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import type { Property } from '../lib/property-types';

import LeaseSigningForm from './lease-signing-form';

interface PropertyDetailProps {
  property: Property;
  onFavoriteToggle: (propertyId: string) => void;
  onBack: () => void;
  onContactLandlord: (propertyId: string) => void;
}

export default function PropertyDetail({
  property,
  onFavoriteToggle,
  onBack,
  onContactLandlord,
}: PropertyDetailProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showLeaseForm, setShowLeaseForm] = useState(false);

  // Mock multiple images for the property
  const propertyImages = [
    property.imageUrl,
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=600&fit=crop',
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative rounded-lg overflow-hidden">
            <Image
              src={propertyImages[activeImageIndex]}
              alt={property.title}
              width={800}
              height={600}
              className="w-full h-96 object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9jkHLU9M2VdxmnbnJqRmgpN0Vd0p"
            />
            <button
              onClick={() => onFavoriteToggle(property.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-colors ${
                property.isFavorite
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`h-5 w-5 ${property.isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {propertyImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative rounded-md overflow-hidden ${
                  activeImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <Image
                  src={image}
                  alt={`${property.title} view ${index + 1}`}
                  width={200}
                  height={150}
                  className="w-full h-20 object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9jkHLU9M2VdxmnbnJqRmgpN0Vd0p"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-lg">
                {property.address}, {property.city}, {property.state}
              </span>
            </div>
            <div className="text-4xl font-bold text-blue-600">
              {formatPrice(property.price)}
              <span className="text-xl font-normal text-gray-600">/month</span>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
            <div className="text-center">
              <Bed className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-semibold">{property.bedrooms}</div>
              <div className="text-gray-600">Bedrooms</div>
            </div>
            <div className="text-center">
              <Bath className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-semibold">{property.bathrooms}</div>
              <div className="text-gray-600">Bathrooms</div>
            </div>
            <div className="text-center">
              <Square className="h-8 w-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-semibold">{property.squareFeet.toLocaleString()}</div>
              <div className="text-gray-600">Sq Ft</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>Available: Immediately</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-500" />
              <span>Managed by: Property Owner</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={() => onContactLandlord(property.id)}
              className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors font-semibold text-lg"
            >
              Contact Landlord
            </button>
            <button
              onClick={() => setShowLeaseForm(true)}
              className="px-6 py-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-semibold"
            >
              Sign Lease
            </button>
          </div>
          {/* Lease Signing Modal */}
          {showLeaseForm && (
            <LeaseSigningForm
              property={{
                id: property.id,
                title: property.title,
                price: property.price,
                address: `${property.address}, ${property.city}, ${property.state}`,
              }}
              onSignLease={(leaseData) => {
                console.log('Lease signed:', leaseData);
                setShowLeaseForm(false);
                // This will trigger tenant role acquisition
                alert('Congratulations! You are now a tenant. Welcome to your new home!');
              }}
              onCancel={() => setShowLeaseForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
