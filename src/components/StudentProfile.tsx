import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';
import type { Student } from '../types/student';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sparkles } from './Sparkles';
import { cn } from '@/lib/utils';

interface StudentProfileProps {
  student: Student;
  onClose: () => void;
}

export const StudentProfile = ({ student, onClose }: StudentProfileProps) => {
  const formatDate = (date: string | null) => {
    if (!date) return 'N/A';
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return date;
    }
  };

  const address = [
    student.SPRADDR_STREET_LINE1,
    student.SPRADDR_STREET_LINE2,
    student.SPRADDR_STREET_LINE3,
    student.SPRADDR_CITY,
    student.SPRADDR_ZIP,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div className="fixed inset-0 z-50 relative">
      {/* Dark Dot Matrix */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#0a0a0a',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
            radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
          imageRendering: 'pixelated',
        }}
      />
      
      {/* Sparkles Effect */}
      <Sparkles
        density={400}
        speed={0.8}
        size={1.2}
        color="#666666"
        opacity={0.4}
        className="absolute inset-0 z-0"
      />
      
      <div className="h-full overflow-y-auto relative z-10">
        <div className="container max-w-3xl mx-auto p-4 pb-20">
          {/* Header - Add top padding to avoid Telegram's Close button */}
          <div className="flex items-center justify-between mb-6 pt-16">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </button>
          </div>

          {/* Profile Header Card */}
          <Card className="mb-6 animate-fade-in">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                {/* Profile Picture */}
                <div className="relative h-32 w-32 mb-4">
                  {student.PROFILE_PICTURE ? (
                    <img
                      src={student.PROFILE_PICTURE}
                      alt={student.E_NAME}
                      className="h-full w-full rounded-full object-cover ring-4 ring-border shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={cn(
                    'flex h-full w-full items-center justify-center rounded-full bg-secondary ring-4 ring-border',
                    student.PROFILE_PICTURE && 'hidden'
                  )}>
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                </div>

                {/* Name and ID */}
                <h1 className="text-3xl font-bold mb-2">{student.E_NAME}</h1>
                <p className="text-muted-foreground text-lg mb-1">
                  Student ID: {student.STUDENT_ID}
                </p>
                {student.CPR_NO && (
                  <p className="text-sm text-muted-foreground">
                    CPR: {student.CPR_NO}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Academic Information */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GraduationCap className="h-5 w-5" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {student.COLLEGE && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">College</p>
                    <p className="font-medium">{student.COLLEGE}</p>
                  </div>
                )}
                {student.MAJR1 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Major</p>
                    <p className="font-medium">{student.MAJR1}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {student.GENDER && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Gender</p>
                    <p className="font-medium">{student.GENDER}</p>
                  </div>
                )}
                {student.BDATE && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
                    <p className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {formatDate(student.BDATE)}
                    </p>
                  </div>
                )}
                {student.CITIZENSHIP && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Citizenship</p>
                    <p className="font-medium">{student.CITIZENSHIP}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="animate-fade-in md:col-span-2" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {student.PB_EMAIL && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Polytechnic Email</p>
                    <a 
                      href={`mailto:${student.PB_EMAIL}`}
                      className="font-medium text-primary hover:underline break-all"
                    >
                      {student.PB_EMAIL}
                    </a>
                  </div>
                )}
                {student.PERS_EMAIL && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Personal Email</p>
                    <a 
                      href={`mailto:${student.PERS_EMAIL}`}
                      className="font-medium text-primary hover:underline break-all"
                    >
                      {student.PERS_EMAIL}
                    </a>
                  </div>
                )}
                {student.MOBILE && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Mobile</p>
                    <a 
                      href={`tel:${student.MOBILE}`}
                      className="font-medium flex items-center gap-2 text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {student.MOBILE}
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Address */}
            {address && (
              <Card className="animate-fade-in md:col-span-2" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="h-5 w-5" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{address}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
