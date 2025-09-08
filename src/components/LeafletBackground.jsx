// src/components/LeafletBackground.jsx
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletBackground = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    console.log("Initializing Leaflet map...");
    
    try {
      // Initialize map
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        zoomSnap: 0.1,
        zoomDelta: 0.1,
        boxZoom: false,
        doubleClickZoom: false,
        scrollWheelZoom: false,
        tap: false,
        touchZoom: false,
        keyboard: false,
      });

      // Add a dark basemap
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        maxZoom: 6,
        minZoom: 2,
      }).addTo(mapInstance.current);

      // Set initial view
      mapInstance.current.setView([20, 0], 2);

      // Add animated particles
      const addParticles = () => {
        const bounds = mapInstance.current.getBounds();
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
          const lat = bounds.getNorth() - Math.random() * (bounds.getNorth() - bounds.getSouth());
          const lng = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());
          
          // Create custom div icon for particles
          const particle = L.divIcon({
            className: 'leaflet-particle',
            html: `<div style="
              width: 8px; 
              height: 8px; 
              border-radius: 50%; 
              background: ${Math.random() > 0.66 ? '#3b82f6' : Math.random() > 0.33 ? '#8b5cf6' : '#ec4899'};
              opacity: ${Math.random() * 0.5 + 0.3};
              box-shadow: 0 0 12px ${Math.random() > 0.66 ? 'rgba(59, 130, 246, 0.7)' : Math.random() > 0.33 ? 'rgba(139, 92, 246, 0.7)' : 'rgba(236, 72, 153, 0.7)'};
            "></div>`,
            iconSize: [8, 8],
          });
          
          const marker = L.marker([lat, lng], { icon: particle, interactive: false }).addTo(mapInstance.current);
          particlesRef.current.push({
            marker,
            lat,
            lng,
            speed: Math.random() * 0.5 + 0.2,
            direction: Math.random() * Math.PI * 2,
          });
        }
      };

      addParticles();

      // Animate particles
      const animateParticles = () => {
        if (!mapInstance.current) return;
        
        const bounds = mapInstance.current.getBounds();
        
        particlesRef.current.forEach(particle => {
          // Move particle
          const newLat = particle.lat + Math.sin(particle.direction) * particle.speed * 0.01;
          const newLng = particle.lng + Math.cos(particle.direction) * particle.speed * 0.01;
          
          // Check if particle is out of bounds and reset if needed
          if (newLat > bounds.getNorth() || newLat < bounds.getSouth() || 
              newLng > bounds.getEast() || newLng < bounds.getWest()) {
            particle.lat = bounds.getNorth() - Math.random() * (bounds.getNorth() - bounds.getSouth());
            particle.lng = bounds.getWest() + Math.random() * (bounds.getEast() - bounds.getWest());
            particle.direction = Math.random() * Math.PI * 2;
          } else {
            particle.lat = newLat;
            particle.lng = newLng;
          }
          
          particle.marker.setLatLng([particle.lat, particle.lng]);
        });
        
        requestAnimationFrame(animateParticles);
      };

      animateParticles();

      // Slowly pan the map for a dynamic effect
      let panDirection = 1;
      const panMap = () => {
        if (!mapInstance.current) return;
        
        const center = mapInstance.current.getCenter();
        const newCenter = [center.lat, center.lng + 0.05 * panDirection];
        
        // Change direction if getting too far east/west
        if (newCenter[1] > 60) panDirection = -1;
        if (newCenter[1] < -60) panDirection = 1;
        
        mapInstance.current.panTo(newCenter, { animate: false });
        setTimeout(panMap, 100);
      };
      
      panMap();

      console.log("Leaflet map initialized successfully");

    } catch (error) {
      console.error("Error initializing Leaflet map:", error);
    }

    // Cleanup function
    return () => {
      if (mapInstance.current) {
        console.log("Removing Leaflet map");
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={mapRef} 
      className="fixed inset-0 -z-10 leaflet-background"
      style={{ height: '100vh', width: '100vw' }}
    />
  );
};

export default LeafletBackground;