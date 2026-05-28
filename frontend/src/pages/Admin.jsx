import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Upload, Trash2, Eye } from 'lucide-react';
import { categories } from '../mock';
import { useToast } from '../hooks/use-toast';

export const Admin = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animations, setAnimations] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    video: null,
    thumbnail: null
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - will be connected to Supabase later
    if (email && password) {
      setIsLoggedIn(true);
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin panel'
      });
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    // Mock publish - will be connected to Supabase later
    const newAnimation = {
      id: Date.now().toString(),
      ...formData,
      created_at: new Date().toISOString()
    };
    setAnimations([newAnimation, ...animations]);
    setFormData({
      title: '',
      description: '',
      category: '',
      video: null,
      thumbnail: null
    });
    toast({
      title: 'Animation published',
      description: 'Your animation has been added to the portfolio'
    });
  };

  const handleDelete = (id) => {
    setAnimations(animations.filter(anim => anim.id !== id));
    toast({
      title: 'Animation deleted',
      description: 'Animation removed from portfolio'
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-[#0a0a0a] border-2 border-[#FFE000] p-8">
          <h1 className="text-3xl font-bold text-[#FFE000] mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-[#FFE000] text-white focus:ring-[#FFE000]"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white mb-2 block">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-[#FFE000] text-white focus:ring-[#FFE000]"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-[#FFE000] border-2 border-[#FFE000] hover:bg-[#FFE000] hover:text-black font-bold transition-all duration-300"
            >
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[#FFE000]">Admin Panel</h1>
          <Button
            onClick={() => setIsLoggedIn(false)}
            className="bg-black text-[#FFE000] border-2 border-[#FFE000] hover:bg-[#FFE000] hover:text-black"
          >
            Logout
          </Button>
        </div>

        {/* Upload Form */}
        <Card className="bg-[#0a0a0a] border-2 border-[#FFE000] p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#FFE000] mb-6">Upload New Animation</h2>
          <form onSubmit={handlePublish} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-white mb-2 block">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-black border-[#FFE000] text-white focus:ring-[#FFE000]"
                  placeholder="Animation title"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-white mb-2 block">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="bg-black border-[#FFE000] text-white focus:ring-[#FFE000]">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-[#FFE000]">
                    {categories.filter(cat => cat !== 'All').map((category) => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-[#FFE000]/10">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-white mb-2 block">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="bg-black border-[#FFE000] text-white focus:ring-[#FFE000] min-h-[100px]"
                placeholder="Describe your animation..."
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="video" className="text-white mb-2 block">Video File (mp4/webm/gif)</Label>
                <div className="border-2 border-dashed border-[#FFE000] rounded-lg p-6 text-center hover:bg-[#FFE000]/5 transition-colors cursor-pointer">
                  <Upload className="mx-auto mb-2 text-[#FFE000]" size={32} />
                  <p className="text-white/70 text-sm">Click to upload video</p>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*,.gif"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, video: e.target.files[0] })}
                  />
                </div>
                {formData.video && (
                  <p className="text-[#FFE000] text-sm mt-2">Selected: {formData.video.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="thumbnail" className="text-white mb-2 block">Thumbnail (optional)</Label>
                <div className="border-2 border-dashed border-[#FFE000] rounded-lg p-6 text-center hover:bg-[#FFE000]/5 transition-colors cursor-pointer">
                  <Upload className="mx-auto mb-2 text-[#FFE000]" size={32} />
                  <p className="text-white/70 text-sm">Click to upload thumbnail</p>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files[0] })}
                  />
                </div>
                {formData.thumbnail && (
                  <p className="text-[#FFE000] text-sm mt-2">Selected: {formData.thumbnail.name}</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-[#FFE000] border-2 border-[#FFE000] hover:bg-[#FFE000] hover:text-black font-bold text-lg py-6 transition-all duration-300"
            >
              Publish Animation
            </Button>
          </form>
        </Card>

        {/* Published Animations List */}
        <div>
          <h2 className="text-2xl font-bold text-[#FFE000] mb-6">Published Animations ({animations.length})</h2>
          {animations.length === 0 ? (
            <Card className="bg-[#0a0a0a] border-2 border-dashed border-[#FFE000] p-12 text-center">
              <p className="text-white/60">No animations published yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {animations.map((anim) => (
                <Card key={anim.id} className="bg-[#0a0a0a] border border-[#FFE000] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-[#FFE000] font-bold text-lg">{anim.title}</h3>
                      <p className="text-white/70 text-sm">{anim.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-black text-[#FFE000] border border-[#FFE000] hover:bg-[#FFE000] hover:text-black"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(anim.id)}
                        className="bg-black text-red-500 border border-red-500 hover:bg-red-500 hover:text-black"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
