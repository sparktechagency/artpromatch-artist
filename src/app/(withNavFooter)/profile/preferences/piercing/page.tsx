'use client';

import { Form } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PiercingPage = () => {
  const [selectedPiercing, setSelectedPiercing] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPiercing.length > 0) {
      localStorage.setItem(
        'selectedPiercing',
        JSON.stringify(selectedPiercing)
      );
    }
  }, [selectedPiercing]);

  const preferredPiercing: string[] = [
    'Earlobe',
    'Transverse Lobe',
    'Helix',
    'Triple Helix',
    'Forward Helix',
    'Anti-Helix',
    'Snug',
    'Industrial',
    'Daith',
    'Rook',
    'Conch',
    'Tragus',
    'Anti-Tragus',
    'Nostril',
    'High Nostril',
    'Septum',
    'Septril',
    'Nasallang',
    'Bridge',
    'Eyebrow',
    'Navel',
    'Floating Navel',
    'Nipple',
    'Tongue',
    'Frenum (Oral)',
    'Cheek',
    'Lip',
    'Labret',
    'Vertical Labret',
    'Inverse Vertical Labret',
    'Philtrum',
    'Surface Piercing',
    'Frenum (Genital)',
    'PA (Genital)',
    'Reverse PA (Genital)',
    'Apadravya (Genital)',
    'Ampallang (Genital)',
    'Hafada (Genital)',
    'Dydoe (Genital)',
    'Lorum (Genital)',
    'Guiche (Genital)',
    'Pubic (Genital)',
    'Christina (Genital)',
    'Hood (Genital)',
    'Triangle (Genital)',
    'Inner Labia (Genital)',
    'Outer Labia (Genital)',
    'Fourchette (Genital)',
    'Princess Albertina (Genital)',
    'Tooth Gems',
  ];

  const handleSelect = (value: string) => {
    setSelectedPiercing(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold">Select Your Favorite Piercings</h1>
        <p className="text-secondary">Pick the ones that match your vibe.</p>
      </div>

      <Form
        name="select-piercing"
        initialValues={{ remember: true }}
        layout="vertical"
        className="mb-10 w-full"
      >
        <div className="flex flex-col gap-4">
          {Array.from(
            { length: Math.ceil(preferredPiercing.length / 7) },
            (_, i) => (
              <div
                key={i}
                className="flex justify-start items-center gap-4 flex-wrap"
              >
                {preferredPiercing
                  .slice(i * 7, i * 7 + 7)
                  .map((piercing: string) => (
                    <button
                      key={piercing}
                      type="button"
                      onClick={() => handleSelect(piercing)}
                      className={`px-8 py-2 rounded-3xl border transition-colors ${
                        selectedPiercing.includes(piercing)
                          ? 'border-primary text-primary font-semibold'
                          : 'hover:border-primary'
                      }`}
                    >
                      {piercing}
                    </button>
                  ))}
              </div>
            )
          )}
        </div>

        <Link href="/profile/preferences">
          <div className="flex justify-end items-end mt-6">
            <button className="bg-primary text-white py-3 px-6 rounded-lg">
              Save
            </button>
          </div>
        </Link>
      </Form>
    </div>
  );
};

export default PiercingPage;
