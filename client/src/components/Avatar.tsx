import { AvatarCustomization } from "@shared/schema";
import { DollarSign } from "lucide-react";

interface AvatarProps {
  customization: AvatarCustomization;
  balance: number;
  className?: string;
}

export default function Avatar({ customization, balance, className = "" }: AvatarProps) {
  const getMood = () => {
    if (balance >= 250000) return 'ecstatic';
    if (balance >= 200000) return 'ecstatic';
    if (balance >= 150000) return 'happy';
    if (balance >= 100000) return 'content';
    if (balance >= 80000) return 'frown';
    if (balance >= 50000) return 'worried';
    if (balance >= 10000) return 'distressed';
    return 'devastated';
  };

  const getClothing = () => {
    if (balance >= 200000) return 'tuxedo';
    if (balance >= 150000) return 'suit';
    if (balance >= 100000) return 'casual';
    if (balance >= 80000) return 'casual';
    if (balance >= 50000) return 'holey-shirt';
    if (balance >= 10000) return 'homeless';
    return 'trash-bag';
  };

  const mood = getMood();
  const clothing = getClothing();

  const hasMoneyAnimation = balance >= 100001;
  const hasJewelry = balance >= 150000;
  const hasCar = balance >= 200000;
  const hasCelebration = balance >= 250000;
  
  const hasSweat = balance >= 50000 && balance < 80000;
  const hasDownBadSign = balance >= 10000 && balance < 50000;
  const hasGarbageBackground = balance < 10000;

  const mouthPaths: Record<string, string> = {
    smile: "M 30 45 Q 40 50 50 45",
    neutral: "M 30 45 L 50 45",
    frown: "M 30 48 Q 40 43 50 48",
    smirk: "M 30 45 Q 35 47 40 45",
    grin: "M 28 45 Q 40 52 52 45",
  };

  const getMouthForMood = () => {
    if (mood === 'ecstatic') return "M 28 42 Q 40 52 52 42";
    if (mood === 'happy') return "M 30 43 Q 40 50 50 43";
    if (mood === 'content') return mouthPaths[customization.mouthType];
    if (mood === 'frown') return "M 30 48 Q 40 43 50 48";
    if (mood === 'worried') return "M 30 47 Q 40 44 50 47";
    if (mood === 'distressed') return "M 30 50 Q 40 44 50 50";
    return "M 28 52 Q 40 46 52 52";
  };

  const getEyeShape = () => {
    if (mood === 'ecstatic' || mood === 'happy') return { y: 30, height: 5 };
    if (mood === 'devastated' || mood === 'distressed') return { y: 31, height: 3.5 };
    if (mood === 'worried') return { y: 30.5, height: 4 };
    return { y: 30, height: 4.5 };
  };

  const eyeShape = getEyeShape();

  const getClothingColor = () => {
    if (clothing === 'tuxedo') return '#1a1a1a';
    if (clothing === 'suit') return '#2563eb';
    if (clothing === 'casual') return '#10b981';
    if (clothing === 'holey-shirt') return '#94a3b8';
    if (clothing === 'homeless') return '#78716c';
    return '#3f3f46';
  };

  const getAccessory = () => {
    if (clothing === 'tuxedo') return (
      <>
        <rect x="35" y="60" width="10" height="5" fill="white" />
        <rect x="38" y="61" width="4" height="3" fill="#1a1a1a" />
      </>
    );
    if (clothing === 'suit') return (
      <line x1="40" y1="60" x2="40" y2="75" stroke="#dc2626" strokeWidth="2" />
    );
    return null;
  };

  return (
    <div className={`relative flex flex-col items-center gap-4 ${className}`}>
      {hasMoneyAnimation && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-money"
              style={{
                left: `${(i * 12) + 5}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            >
              <DollarSign className="w-6 h-6 text-chart-2 opacity-40" />
            </div>
          ))}
        </div>
      )}

      {hasSweat && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-sweat-drop"
              style={{
                left: `${35 + (i * 8)}%`,
                top: '20%',
                animationDelay: `${i * 0.6}s`,
              }}
            >
              <div className="w-2 h-3 bg-blue-400 rounded-full opacity-60" />
            </div>
          ))}
        </div>
      )}

      {hasGarbageBackground && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full opacity-60">
            <path d="M 10 150 L 15 140 L 25 135 L 35 138 L 42 145 L 45 155 L 40 165 L 30 168 L 18 163 Z" fill="#3f3f46" stroke="#27272a" strokeWidth="1" />
            <path d="M 50 140 L 58 130 L 70 128 L 80 132 L 85 142 L 82 152 L 72 158 L 60 157 L 52 148 Z" fill="#52525b" stroke="#27272a" strokeWidth="1" />
            <path d="M 120 145 L 128 135 L 140 133 L 150 137 L 155 147 L 152 157 L 142 163 L 130 162 L 122 153 Z" fill="#3f3f46" stroke="#27272a" strokeWidth="1" />
            <path d="M 160 135 L 168 125 L 180 123 L 188 128 L 192 138 L 188 148 L 178 154 L 166 152 L 162 143 Z" fill="#52525b" stroke="#27272a" strokeWidth="1" />
            <path d="M 85 165 L 92 155 L 102 153 L 112 157 L 115 167 L 110 177 L 100 182 L 88 180 Z" fill="#3f3f46" stroke="#27272a" strokeWidth="1" />
          </svg>
          
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-buzz-fly"
              style={{
                left: `${(i * 15) + 10}%`,
                top: `${(i % 3) * 25 + 20}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${2 + (i % 2)}s`,
              }}
            >
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10">
        {hasCar && (
          <div className="mb-4">
            <svg viewBox="0 0 200 140" className="w-full h-32">
              <ellipse cx="30" cy="130" rx="25" ry="4" fill="#000" opacity="0.2" />
              <ellipse cx="170" cy="130" rx="25" ry="4" fill="#000" opacity="0.2" />
              
              <path d="M 10 130 Q 10 120 20 115 L 30 105 L 50 95 L 80 85 L 120 85 L 150 95 L 170 105 L 180 115 Q 190 120 190 130 Z" fill="#dc2626" stroke="#991b1b" strokeWidth="2" />
              
              <rect x="45" y="90" width="35" height="20" fill="#4a90e2" opacity="0.6" rx="2" />
              <rect x="120" y="90" width="35" height="20" fill="#4a90e2" opacity="0.6" rx="2" />
              
              <circle cx="50" cy="130" r="12" fill="#1a1a1a" />
              <circle cx="50" cy="130" r="6" fill="#71717a" />
              <circle cx="150" cy="130" r="12" fill="#1a1a1a" />
              <circle cx="150" cy="130" r="6" fill="#71717a" />
              
              <rect x="85" y="95" width="30" height="15" fill="#1a1a1a" opacity="0.8" rx="2" />
              
              <circle cx="20" cy="110" r="4" fill="#fbbf24" opacity="0.9" />
              <circle cx="180" cy="110" r="4" fill="#dc2626" opacity="0.9" />
            </svg>
            
            <div className="flex justify-around -mt-2">
              <svg viewBox="0 0 40 80" className="w-12 h-20">
                <rect x="15" y="40" width="10" height="40" fill="#6b4423" />
                <ellipse cx="20" cy="35" rx="12" ry="15" fill="#27ae60" />
                <ellipse cx="20" cy="25" rx="10" ry="12" fill="#27ae60" />
                <ellipse cx="20" cy="18" rx="8" ry="10" fill="#27ae60" />
              </svg>
              <svg viewBox="0 0 40 80" className="w-12 h-20">
                <rect x="15" y="40" width="10" height="40" fill="#6b4423" />
                <ellipse cx="20" cy="35" rx="12" ry="15" fill="#27ae60" />
                <ellipse cx="20" cy="25" rx="10" ry="12" fill="#27ae60" />
                <ellipse cx="20" cy="18" rx="8" ry="10" fill="#27ae60" />
              </svg>
            </div>
          </div>
        )}

        {hasCelebration && (
          <>
            <div className="absolute -left-24 top-12 z-0">
              <svg viewBox="0 0 60 100" className="w-16 h-24">
                <circle cx="30" cy="20" r="8" fill="#fbbf24" />
                <path d="M 25 25 Q 22 30 23 35" stroke="#fbbf24" strokeWidth="2" fill="none" />
                <path d="M 35 25 Q 38 30 37 35" stroke="#fbbf24" strokeWidth="2" fill="none" />
                <ellipse cx="28" cy="19" rx="1.5" ry="2" fill="#1a1a1a" />
                <ellipse cx="32" cy="19" rx="1.5" ry="2" fill="#1a1a1a" />
                <path d="M 27 22 Q 30 24 33 22" stroke="#1a1a1a" strokeWidth="1" fill="none" />
                <path d="M 20 28 L 22 45 L 30 60 L 27 45 L 25 28 Z" fill="#ec4899" />
                <path d="M 40 28 L 38 45 L 30 60 L 33 45 L 35 28 Z" fill="#ec4899" />
                <rect x="25" y="28" width="10" height="20" fill="#ec4899" rx="2" />
                <path d="M 22 45 L 20 65" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                <path d="M 38 45 L 40 65" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <div className="absolute -right-24 top-16 z-0">
              <svg viewBox="0 0 60 100" className="w-16 h-24">
                <circle cx="30" cy="20" r="8" fill="#fbbf24" />
                <path d="M 22 25 Q 18 32 20 38" stroke="#fbbf24" strokeWidth="2" fill="none" />
                <path d="M 38 25 Q 42 32 40 38" stroke="#fbbf24" strokeWidth="2" fill="none" />
                <ellipse cx="28" cy="19" rx="1.5" ry="2" fill="#1a1a1a" />
                <ellipse cx="32" cy="19" rx="1.5" ry="2" fill="#1a1a1a" />
                <path d="M 27 22 Q 30 24 33 22" stroke="#1a1a1a" strokeWidth="1" fill="none" />
                <path d="M 20 28 L 18 45 L 22 60 L 23 45 L 24 28 Z" fill="#8b5cf6" />
                <path d="M 40 28 L 42 45 L 38 60 L 37 45 L 36 28 Z" fill="#8b5cf6" />
                <rect x="25" y="28" width="10" height="20" fill="#8b5cf6" rx="2" />
                <path d="M 18 45 L 15 65" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                <path d="M 42 45 L 45 65" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
          </>
        )}

        {hasDownBadSign && (
          <div className="absolute -left-20 top-20 z-20">
            <svg viewBox="0 0 80 60" className="w-20 h-16">
              <rect x="5" y="5" width="70" height="35" fill="#fef3c7" stroke="#92400e" strokeWidth="2" rx="2" />
              <text x="40" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e" fontFamily="Comic Neue, cursive">DOWN</text>
              <text x="40" y="32" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e" fontFamily="Comic Neue, cursive">BAD</text>
              <line x1="40" y1="40" x2="40" y2="55" stroke="#6b4423" strokeWidth="3" />
            </svg>
          </div>
        )}

        <svg viewBox="0 0 80 100" className="w-full h-full relative z-10">
          <circle cx="40" cy="35" r="18" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
          
          {customization.hairColor && (
            <>
              <ellipse cx="40" cy="20" rx="19" ry="12" fill={
                customization.hairColor === 'black' ? '#1a1a1a' :
                customization.hairColor === 'brown' ? '#6b4423' :
                customization.hairColor === 'blonde' ? '#f4d03f' :
                customization.hairColor === 'red' ? '#c0392b' :
                customization.hairColor === 'gray' ? '#95a5a6' :
                customization.hairColor === 'blue' ? '#3498db' :
                customization.hairColor === 'green' ? '#27ae60' :
                '#9b59b6'
              } />
              {customization.gender === 'female' && (
                <>
                  <path d="M 22 25 Q 20 35 25 40" fill={
                    customization.hairColor === 'black' ? '#1a1a1a' :
                    customization.hairColor === 'brown' ? '#6b4423' :
                    customization.hairColor === 'blonde' ? '#f4d03f' :
                    customization.hairColor === 'red' ? '#c0392b' :
                    customization.hairColor === 'gray' ? '#95a5a6' :
                    customization.hairColor === 'blue' ? '#3498db' :
                    customization.hairColor === 'green' ? '#27ae60' :
                    '#9b59b6'
                  } />
                  <path d="M 58 25 Q 60 35 55 40" fill={
                    customization.hairColor === 'black' ? '#1a1a1a' :
                    customization.hairColor === 'brown' ? '#6b4423' :
                    customization.hairColor === 'blonde' ? '#f4d03f' :
                    customization.hairColor === 'red' ? '#c0392b' :
                    customization.hairColor === 'gray' ? '#95a5a6' :
                    customization.hairColor === 'blue' ? '#3498db' :
                    customization.hairColor === 'green' ? '#27ae60' :
                    '#9b59b6'
                  } />
                </>
              )}
            </>
          )}
          
          <ellipse cx="32" cy={eyeShape.y} rx="3" ry={eyeShape.height} fill={
            customization.eyeColor === 'brown' ? '#6b4423' :
            customization.eyeColor === 'blue' ? '#3498db' :
            customization.eyeColor === 'green' ? '#27ae60' :
            customization.eyeColor === 'hazel' ? '#95763c' :
            customization.eyeColor === 'gray' ? '#7f8c8d' :
            '#d68910'
          } />
          <ellipse cx="48" cy={eyeShape.y} rx="3" ry={eyeShape.height} fill={
            customization.eyeColor === 'brown' ? '#6b4423' :
            customization.eyeColor === 'blue' ? '#3498db' :
            customization.eyeColor === 'green' ? '#27ae60' :
            customization.eyeColor === 'hazel' ? '#95763c' :
            customization.eyeColor === 'gray' ? '#7f8c8d' :
            '#d68910'
          } />
          
          <ellipse cx="40" cy="38" rx={
            customization.noseSize === 'small' ? 2.5 :
            customization.noseSize === 'medium' ? 3.5 :
            4.5
          } ry={
            customization.noseSize === 'small' ? 3 :
            customization.noseSize === 'medium' ? 4 :
            5
          } fill="#f59e0b" />
          
          <path d={getMouthForMood()} stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {customization.facialHair === 'beard' && (
            <path d="M 28 48 Q 30 55 40 56 Q 50 55 52 48" fill="#1a1a1a" />
          )}
          {customization.facialHair === 'mustache' && (
            <>
              <path d="M 28 43 Q 32 45 36 44" stroke="#1a1a1a" strokeWidth="2" fill="none" />
              <path d="M 52 43 Q 48 45 44 44" stroke="#1a1a1a" strokeWidth="2" fill="none" />
            </>
          )}
          {customization.facialHair === 'goatee' && (
            <ellipse cx="40" cy="51" rx="4" ry="5" fill="#1a1a1a" />
          )}
          
          {hasJewelry && (
            <>
              <ellipse cx="40" cy="54" rx="11" ry="2" fill="none" stroke="#fbbf24" strokeWidth="2" />
              <ellipse cx="40" cy="56" rx="10" ry="2" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
              <ellipse cx="40" cy="58" rx="9" ry="2" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
              <circle cx="24" cy="72" r="2.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
              <rect x="22.5" y="72" width="3" height="1.5" fill="#fbbf24" />
              <rect x="19" y="68" width="6" height="3" fill="#1a1a1a" rx="0.5" />
              <rect x="20" y="68.5" width="4" height="2" fill="#fbbf24" rx="0.3" />
            </>
          )}
          
          {clothing === 'trash-bag' ? (
            <>
              <path d="M 25 55 L 30 60 L 32 75 L 30 90 L 20 88 L 18 70 Z" fill="#3f3f46" stroke="#27272a" strokeWidth="1.5" />
              <path d="M 55 55 L 50 60 L 48 75 L 50 90 L 60 88 L 62 70 Z" fill="#3f3f46" stroke="#27272a" strokeWidth="1.5" />
              <rect x="25" y="55" width="30" height="35" rx="3" fill="#3f3f46" stroke="#27272a" strokeWidth="1.5" />
              <path d="M 30 62 L 32 65 M 45 58 L 48 62 M 35 70 L 38 73 M 50 68 L 52 72" stroke="#71717a" strokeWidth="1" />
            </>
          ) : clothing === 'homeless' ? (
            <>
              <rect x="25" y="55" width="30" height="35" rx="3" fill="#78716c" />
              <path d="M 30 88 L 28 92 L 32 90 Z M 50 88 L 52 92 L 48 90 Z M 35 75 L 33 78 L 37 77 Z" fill="#57534e" />
              <line x1="28" y1="68" x2="34" y2="70" stroke="#57534e" strokeWidth="1.5" />
              <line x1="46" y1="65" x2="52" y2="67" stroke="#57534e" strokeWidth="1.5" />
              {customization.gender === 'male' && (
                <>
                  <rect x="23" y="55" width="8" height="30" fill="#78716c" opacity="0.8" />
                  <rect x="49" y="55" width="8" height="30" fill="#78716c" opacity="0.8" />
                </>
              )}
            </>
          ) : clothing === 'holey-shirt' ? (
            <>
              <rect x="25" y="55" width="30" height="35" rx="3" fill="#94a3b8" />
              <ellipse cx="32" cy="68" rx="2" ry="3" fill="#475569" />
              <ellipse cx="48" cy="72" rx="2.5" ry="3.5" fill="#475569" />
              <ellipse cx="38" cy="80" rx="1.5" ry="2" fill="#475569" />
              {customization.gender === 'male' && (
                <>
                  <rect x="23" y="55" width="8" height="30" fill="#94a3b8" opacity="0.8" />
                  <rect x="49" y="55" width="8" height="30" fill="#94a3b8" opacity="0.8" />
                </>
              )}
            </>
          ) : (
            <>
              <rect x="25" y="55" width="30" height="35" rx="3" fill={getClothingColor()} />
              {customization.gender === 'female' && (
                <path d="M 25 70 L 20 90 L 25 90 Z M 55 70 L 60 90 L 55 90 Z" fill={getClothingColor()} />
              )}
              {customization.gender === 'male' && (
                <>
                  <rect x="23" y="55" width="8" height="30" fill={getClothingColor()} opacity="0.8" />
                  <rect x="49" y="55" width="8" height="30" fill={getClothingColor()} opacity="0.8" />
                </>
              )}
              {getAccessory()}
            </>
          )}
        </svg>
      </div>
      
      <div className="text-center relative z-10">
        <p className="font-comic text-lg font-bold text-foreground">
          {balance >= 250000 && "Living the dream!"}
          {balance >= 200000 && balance < 250000 && "Cruising in style!"}
          {balance >= 150000 && balance < 200000 && "Bling bling!"}
          {balance > 100000 && balance < 150000 && "Money talks!"}
          {balance === 100000 && "Doing alright"}
          {balance >= 80000 && balance < 100000 && "Not feeling great..."}
          {balance >= 50000 && balance < 80000 && "Sweating bullets!"}
          {balance >= 10000 && balance < 50000 && "Down bad..."}
          {balance < 10000 && "Rock bottom..."}
        </p>
        <p className="text-sm text-muted-foreground">
          {clothing === 'tuxedo' && "Dressed to impress"}
          {clothing === 'suit' && "Business casual"}
          {clothing === 'casual' && "Comfortable"}
          {clothing === 'holey-shirt' && "Shirt's falling apart"}
          {clothing === 'homeless' && "Lost it all"}
          {clothing === 'trash-bag' && "Living in the gutter"}
        </p>
      </div>

      <style>{`
        @keyframes float-money {
          0% {
            transform: translateY(100%) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-100%) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float-money {
          animation: float-money 4s ease-in-out infinite;
        }
        
        @keyframes sweat-drop {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(60px) scale(0.5);
            opacity: 0;
          }
        }
        .animate-sweat-drop {
          animation: sweat-drop 1.5s ease-in infinite;
        }
        
        @keyframes buzz-fly {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(10px, -8px);
          }
          50% {
            transform: translate(-5px, 5px);
          }
          75% {
            transform: translate(8px, 10px);
          }
        }
        .animate-buzz-fly {
          animation: buzz-fly 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
