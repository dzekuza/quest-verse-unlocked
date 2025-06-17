
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Star, Target, Users, Award, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  type: 'social' | 'upload' | 'quiz' | 'link';
  status: 'available' | 'completed' | 'pending';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface User {
  id: string;
  name: string;
  xp: number;
  level: number;
  rank: number;
  avatar: string;
  completedQuests: number;
  badges: string[];
}

const Dashboard = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Alex Johnson',
    xp: 2750,
    level: 12,
    rank: 3,
    avatar: '/placeholder.svg',
    completedQuests: 23,
    badges: ['Early Bird', 'Social Butterfly', 'Quest Master']
  });

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Follow us on Twitter',
      description: 'Follow our official Twitter account and help us grow our community',
      xp: 100,
      type: 'social',
      status: 'available',
      category: 'Social Media',
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'Share your story',
      description: 'Upload a photo or video sharing how our platform helped you',
      xp: 250,
      type: 'upload',
      status: 'available',
      category: 'Content Creation',
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'Community Quiz',
      description: 'Test your knowledge about our platform and community guidelines',
      xp: 150,
      type: 'quiz',
      status: 'completed',
      category: 'Knowledge',
      difficulty: 'easy'
    },
    {
      id: '4',
      title: 'Join Discord Server',
      description: 'Join our Discord community and introduce yourself',
      xp: 200,
      type: 'social',
      status: 'pending',
      category: 'Social Media',
      difficulty: 'easy'
    },
    {
      id: '5',
      title: 'Refer a Friend',
      description: 'Invite a friend to join our platform using your referral link',
      xp: 500,
      type: 'link',
      status: 'available',
      category: 'Referral',
      difficulty: 'hard'
    }
  ]);

  const [activeTab, setActiveTab] = useState('available');

  const filteredQuests = quests.filter(quest => {
    if (activeTab === 'available') return quest.status === 'available';
    if (activeTab === 'completed') return quest.status === 'completed';
    if (activeTab === 'pending') return quest.status === 'pending';
    return true;
  });

  const handleStartQuest = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, status: 'pending' as const }
        : quest
    ));
    toast({
      title: "Quest Started!",
      description: "Complete the quest to earn XP and climb the leaderboard.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'social': return <Users className="w-4 h-4" />;
      case 'upload': return <Star className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'link': return <Award className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const nextLevelXP = (user.level + 1) * 1000;
  const currentLevelXP = user.level * 1000;
  const progressPercentage = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* User Stats Header */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="md:col-span-2 bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="text-purple-200">
                    Level {user.level} • Rank #{user.rank}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {user.level + 1}</span>
                  <span>{user.xp - currentLevelXP} / {nextLevelXP - currentLevelXP} XP</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{user.xp.toLocaleString()}</div>
              <p className="text-xs text-purple-200">+150 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Quests</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{user.completedQuests}</div>
              <p className="text-xs text-purple-200">5 this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Your Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <Badge key={index} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1">
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quests Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <CardTitle>Available Quests</CardTitle>
            <CardDescription className="text-purple-200">
              Complete quests to earn XP and climb the leaderboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="available" className="data-[state=active]:bg-purple-500">
                  Available ({quests.filter(q => q.status === 'available').length})
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-purple-500">
                  Pending ({quests.filter(q => q.status === 'pending').length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-purple-500">
                  Completed ({quests.filter(q => q.status === 'completed').length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredQuests.map((quest) => (
                    <Card key={quest.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(quest.type)}
                            <Badge variant="outline" className="text-xs">
                              {quest.category}
                            </Badge>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${getDifficultyColor(quest.difficulty)}`} />
                        </div>
                        <CardTitle className="text-lg text-white">{quest.title}</CardTitle>
                        <CardDescription className="text-purple-200">
                          {quest.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-semibold">{quest.xp} XP</span>
                          </div>
                          {quest.status === 'available' && (
                            <Button 
                              onClick={() => handleStartQuest(quest.id)}
                              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                            >
                              Start Quest
                            </Button>
                          )}
                          {quest.status === 'pending' && (
                            <Badge className="bg-yellow-500/20 text-yellow-400">Pending Review</Badge>
                          )}
                          {quest.status === 'completed' && (
                            <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
