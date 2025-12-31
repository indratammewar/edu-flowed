import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { LMSLayout } from '@/components/LMSLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, User, Loader2, Save, LogOut, Mail, Phone, BookOpen, Calendar } from 'lucide-react';
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const profileSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  phone: z.string().max(20, 'Phone number is too long').optional(),
  course: z.string().max(100, 'Course name is too long').optional(),
  year: z.number().min(1).max(6).optional().nullable(),
  bio: z.string().max(500, 'Bio is too long').optional(),
});

interface ProfileData {
  full_name: string;
  username: string;
  roll_number: string;
  phone: string;
  course: string;
  year: number | null;
  bio: string;
  avatar_url: string | null;
}

export default function Profile() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    username: '',
    roll_number: '',
    phone: '',
    course: '',
    year: null,
    bio: '',
    avatar_url: null,
  });
  const [originalProfile, setOriginalProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sample attendance data
  const attendanceData = {
    overall: 78,
    attended: 156,
    total: 200,
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        const profileData: ProfileData = {
          full_name: data.full_name || '',
          username: data.username || '',
          roll_number: data.roll_number || '',
          phone: data.phone || '',
          course: data.course || '',
          year: data.year,
          bio: data.bio || '',
          avatar_url: data.avatar_url,
        };
        setProfile(profileData);
        setOriginalProfile(profileData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = () => {
    if (!originalProfile) return false;
    return JSON.stringify(profile) !== JSON.stringify(originalProfile);
  };

  const validateForm = () => {
    try {
      profileSchema.parse({
        ...profile,
        year: profile.year || undefined,
      });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((e) => {
          if (e.path[0]) {
            fieldErrors[e.path[0] as string] = e.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSave = async () => {
    if (!user || !validateForm()) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone || null,
          course: profile.course || null,
          year: profile.year,
          bio: profile.bio || null,
        })
        .eq('id', user.id);

      if (error) throw error;

      setOriginalProfile(profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
    toast.success('Signed out successfully');
  };

  if (authLoading || isLoading) {
    return (
      <LMSLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </LMSLayout>
    );
  }

  return (
    <LMSLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Profile
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your academic profile</p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {profile.full_name ? profile.full_name.charAt(0).toUpperCase() : <User />}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-foreground">
                  {profile.full_name || 'Your Name'}
                </h2>
                <p className="text-muted-foreground text-sm">@{profile.username || 'username'}</p>
                <Badge variant="secondary" className="mt-2">
                  {profile.roll_number || 'Roll Number'}
                </Badge>

                <div className="w-full mt-6 space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profile.phone || 'Not set'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profile.course || 'Not set'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {profile.year ? `Year ${profile.year}` : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Form & Attendance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Summary */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Overall Attendance</span>
                  <span className={`font-bold ${attendanceData.overall >= 75 ? 'text-success' : 'text-destructive'}`}>
                    {attendanceData.overall}%
                  </span>
                </div>
                <Progress value={attendanceData.overall} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  {attendanceData.attended} of {attendanceData.total} classes attended
                </p>
              </CardContent>
            </Card>

            {/* Edit Profile Form */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                    {errors.full_name && (
                      <p className="text-sm text-destructive">{errors.full_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input
                      id="course"
                      value={profile.course}
                      onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                      placeholder="e.g. Computer Science"
                    />
                    {errors.course && (
                      <p className="text-sm text-destructive">{errors.course}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Select
                      value={profile.year?.toString() || ''}
                      onValueChange={(value) => setProfile({ ...profile, year: value ? parseInt(value) : null })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((y) => (
                          <SelectItem key={y} value={y.toString()}>
                            Year {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.year && (
                      <p className="text-sm text-destructive">{errors.year}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us a bit about yourself..."
                    rows={3}
                  />
                  {errors.bio && (
                    <p className="text-sm text-destructive">{errors.bio}</p>
                  )}
                  <p className="text-xs text-muted-foreground">{profile.bio.length}/500 characters</p>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving || !hasChanges()}
                    className="gap-2"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </LMSLayout>
  );
}
