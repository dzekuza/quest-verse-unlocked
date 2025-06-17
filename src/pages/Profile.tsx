
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Users, Award, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  xpAwarded: number;
  date: string;
  questType: string;
}

interface Stats {
  totalXP: number;
  level: number;
  rank: number;
  completedQuests: number;
  weeklyXP: number;
  monthlyXP: number;
  streak: number;
  badges: string[];
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats: Stats = {
    totalXP: 6450,
    level: 21,
    rank: 3,
    completedQuests: 43,
    weeklyXP: 320,
    monthlyXP: 1250,
    streak: 7,
    badges: ['Rising Star', 'Quest Master', 'Social Butterfly', 'Dedicated', 'Helper', 'Early Bird']
  };

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Community Quiz Champion',
      description: 'Completed the weekly community quiz with a perfect score',
      xpAwarded: 150,
      date: '2024-01-15',
      questType: 'quiz'
    },
    {
      id: '2',
      title: 'Social Media Superstar',
      description: 'Successfully shared content on Twitter and gained 50+ engagements',
      xpAwarded: 250,
      date: '2024-01-14',
      questType: 'social'
    },
    {
      id: '3',
      title: 'Content Creator',
      description: 'Uploaded high-quality content that received community approval',
      xpAwarded: 300,
      date: '2024-01-12',
      questType: 'upload'
    },
    {
      id: '4',
      title: 'Referral Master',
      description: 'Successfully referred 3 new members to the community',
      xpAwarded: 500,
      date: '2024-01-10',
      questType: 'link'
    },
    {
      id: '5',
      title: 'Discord Community Leader',
      description: 'Actively participated in Discord discussions for 5 consecutive days',
      xpAwarded: 200,
      date: '2024-01-08',
      questType: 'social'
    }
  ];

  const nextLevelXP = (userStats.level + 1) * 1000;
  const currentLevelXP = userStats.level * 1000;
  const progressPercentage = ((userStats.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  const getQuestTypeIcon = (type: string) => {
    switch (type) {
      case 'social': return <Users className="w-4 h-4" />;
      case 'upload': return <Star className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'link': return <Award className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getQuestTypeColor = (type: string) => {
    switch (type) {
      case 'social': return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'upload': return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      case 'quiz': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'link': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-4xl font-bold ring-4 ring-purple-400/50">
                AJ
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">Alex Johnson</h1>
                  <p className="text-purple-200 text-lg">Level {userStats.level} • Rank #{userStats.rank}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress to Level {userStats.level + 1}</span>
                    <span>{userStats.totalXP - currentLevelXP} / {nextLevelXP - currentLevelXP} XP</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {userStats.badges.slice(0, 4).map((badge, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                      {badge}
                    </Badge>
                  ))}
                  {userStats.badges.length > 4 && (
                    <Badge className="bg-purple-500/30 text-purple-200">
                      +{userStats.badges.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total XP</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{userStats.totalXP.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Quests</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{userStats.completedQuests}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly XP</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{userStats.weeklyXP}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{userStats.streak} days</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Tabs */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/10">
                <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-500">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="badges" className="data-[state=active]:bg-purple-500">
                  Badges
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Performance This Month
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">Monthly XP</span>
                        <span className="text-yellow-400 font-semibold">{userStats.monthlyXP}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">Weekly Average</span>
                        <span className="text-blue-400 font-semibold">{Math.round(userStats.monthlyXP / 4)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-purple-200">Daily Average</span>
                        <span className="text-green-400 font-semibold">{Math.round(userStats.monthlyXP / 30)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-400" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentAchievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${getQuestTypeColor(achievement.questType)}`}>
                            {getQuestTypeIcon(achievement.questType)}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">{achievement.title}</p>
                            <p className="text-purple-200 text-xs">{achievement.date}</p>
                          </div>
                          <Badge className="bg-yellow-500/20 text-yellow-400">
                            +{achievement.xpAwarded} XP
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Recent Achievements</h3>
                    <Badge className="bg-green-500/20 text-green-400">
                      {recentAchievements.length} completed
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {recentAchievements.map((achievement) => (
                      <Card key={achievement.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${getQuestTypeColor(achievement.questType)}`}>
                              {getQuestTypeIcon(achievement.questType)}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-semibold">{achievement.title}</h4>
                              <p className="text-purple-200 text-sm">{achievement.description}</p>
                              <p className="text-purple-300 text-xs mt-1">{achievement.date}</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-yellow-500/20 text-yellow-400 mb-1">
                                +{achievement.xpAwarded} XP
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="badges" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Your Badges</h3>
                    <Badge className="bg-purple-500/20 text-purple-400">
                      {userStats.badges.length} earned
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userStats.badges.map((badge, index) => (
                      <Card key={index} className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border-purple-400/30 hover:scale-105 transition-all duration-300">
                        <CardContent className="p-4 text-center">
                          <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                          <h4 className="text-white font-semibold">{badge}</h4>
                          <p className="text-purple-200 text-xs mt-1">Achievement Badge</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
