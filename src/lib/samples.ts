export interface SampleContent {
  id: string;
  label: string;
  category: string;
  content: string;
}

export const samples: SampleContent[] = [
  {
    id: "luxury-beauty",
    label: "Luxury Skincare",
    category: "Beauty & Cosmetics",
    content: `Introducing Révitalift Pro-Retinol Night Serum — our most advanced anti-aging formula yet.

Powered by 0.3% Pure Retinol and Hyaluronic Acid, this lightweight serum works overnight to visibly reduce wrinkles by up to 47% in just 4 weeks.

Wake up to firmer, smoother, younger-looking skin. Because you deserve to turn back time.

✓ Dermatologist-tested
✓ #1 selling anti-aging serum in Europe
✓ Suitable for all skin types

Shop now and get 20% off your first order. Your best skin starts tonight.`,
  },
  {
    id: "consumer-electronics",
    label: "Smart Home Device",
    category: "Consumer Electronics",
    content: `Meet AirPure 360 — the smart air purifier that thinks ahead.

Using real-time AI sensors, AirPure 360 detects pollutants, allergens, and VOCs before you even notice them. It automatically adjusts its 4-stage HEPA filtration to keep your home's air pristine.

Key features:
• Covers rooms up to 75m²
• Whisper-quiet mode: just 22dB
• App-controlled with smart home integration
• Energy Star certified — uses less power than a lightbulb

Breathe easier. Live smarter. AirPure 360 — because the air you breathe matters.`,
  },
  {
    id: "food-beverage",
    label: "Premium Chocolate",
    category: "Food & Beverage",
    content: `Maison Noir — Single Origin Dark Chocolate, 72% Cacao

Crafted from hand-selected cacao beans from the Tumaco region of Colombia, each bar tells a story of terroir, tradition, and uncompromising quality.

Tasting notes: deep earthy richness with hints of red berries, roasted coffee, and a lingering smoky finish.

• Bean-to-bar crafted in small batches
• Direct trade with Colombian farmers
• No added preservatives or artificial flavors
• Vegan & gluten-free

Indulge in chocolate the way it was meant to be experienced. Life is too short for ordinary chocolate.`,
  },
];
