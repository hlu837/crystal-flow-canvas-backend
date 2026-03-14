import { motion, Easing } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Award, ExternalLink, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import certificateOfIncorporation from '@/assets/certificate-of-incorporation.jpg';
import stateLicenceCertificate from '@/assets/state-licence-certificate.jpg';
const easeSmooth: Easing = [0.25, 0.46, 0.45, 0.94];

// Placeholder component for certificate viewer with watermark
const CertificateViewer = ({ 
  title, 
  description, 
  imageSrc,
  note 
}: { 
  title: string; 
  description: string; 
  imageSrc?: string;
  note: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeSmooth }}
      className="relative"
    >
      {/* Certificate Container with watermark overlay */}
      <div className="relative bg-card/30 backdrop-blur-md border border-primary/20 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-primary/20">
          <h2 className="font-orbitron text-xl text-foreground font-bold tracking-wider flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            {title}
          </h2>
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
        </div>

        {/* Certificate Display Area */}
        <div 
          className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center p-6 select-none"
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: 'none' }}
        >
          {imageSrc ? (
            <>
              {/* Certificate Image */}
              <img 
                src={imageSrc} 
                alt={title}
                className="max-w-full max-h-[550px] object-contain pointer-events-none"
                draggable={false}
              />
              
              {/* Watermark Overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div 
                  className="absolute inset-0 flex flex-wrap items-center justify-center gap-20 -rotate-45 scale-150"
                  style={{ opacity: 0.08 }}
                >
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span 
                      key={i} 
                      className="text-foreground font-orbitron text-lg whitespace-nowrap"
                    >
                      For Website Display Only
                    </span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Placeholder when no image */
            <div className="text-center text-muted-foreground">
              <Shield className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="font-orbitron text-sm">Certificate will be displayed here</p>
              <p className="text-xs mt-2">Coming soon...</p>
            </div>
          )}
        </div>

        {/* Note below certificate */}
        <div className="p-4 bg-muted/30 border-t border-primary/20">
          <p className="text-muted-foreground text-xs text-center italic flex items-center justify-center gap-2">
            <Shield className="w-3 h-3" />
            {note}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Legal = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: easeSmooth }
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12 text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-wider mb-4"
            >
              Legal <span className="text-primary">Information</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Company registration and licensing documents for transparency and verification.
            </motion.p>
          </motion.div>

          {/* Certificates Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:gap-10"
          >
            {/* Certificate of Incorporation */}
            <motion.div variants={itemVariants} id="incorporation">
              <CertificateViewer
                title="Certificate of Incorporation"
                description="Official company incorporation document issued by the Registrar of Companies."
                imageSrc={certificateOfIncorporation}
                note="This is a Certificate of Incorporation for reference only. Document is protected and cannot be downloaded."
              />
            </motion.div>

            {/* Company Licence */}
            <motion.div variants={itemVariants} id="licence">
              <CertificateViewer
                title="State Registration Certificate"
                description="Uttar Pradesh Shops and Commercial Establishment Registration Certificate issued by Labour Department."
                imageSrc={stateLicenceCertificate}
                note="This is a State Licence Certificate for reference only. Document is protected and cannot be downloaded."
              />
            </motion.div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-orbitron text-sm font-semibold text-foreground">Security Notice</h3>
            </div>
            <p className="text-muted-foreground text-xs max-w-xl mx-auto">
              All documents displayed on this page are for verification purposes only. 
              Downloads are disabled and watermarks have been applied to prevent unauthorized use.
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legal;
