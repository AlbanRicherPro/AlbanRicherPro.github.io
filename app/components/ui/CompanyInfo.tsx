import Image from 'next/image';

interface CompanyInfoProps {
  logo: string;
  logoAlt: string;
  position: string;
  company: string;
  period: string;
}

export default function CompanyInfo({ 
  logo, 
  logoAlt, 
  position, 
  company, 
  period 
}: CompanyInfoProps) {
  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-indigo-500/30 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
        <Image
          src={logo}
          alt={logoAlt}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white mb-2">{position}</h3>
        <p className="text-xl text-indigo-400 font-semibold">{company} • {period}</p>
      </div>
    </div>
  );
}