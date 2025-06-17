
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, Crown, Star } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  xp: number;
  level: number;
  rank: number;
  avatar: string;
  weeklyXP: number;
  completedQuests: number;
  badges: string[];
}

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('all-time');

  const allTimeUsers: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      xp: 8750,
      level: 28,
      rank: 1,
      avatar: '/placeholder.svg',
      weeklyXP: 450,
      completedQuests: 67,
      badges: ['Legend', 'Quest Master', 'Community Leader']
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      xp: 7200,
      level: 24,
      rank: 2,
      avatar: '/placeholder.svg',
      weeklyXP: 380,
      completedQuests: 54,
      badges: ['Elite', 'Social Butterfly', 'Mentor']
    },
    {
      id: '3',
      name: 'Alex Johnson',
      xp: 6450,
      level: 21,
      rank: 3,
      avatar: '/placeholder.svg',
      weeklyXP: 320,
      completedQuests: 43,
      badges: ['Rising Star', 'Dedicated', 'Helper']
    },
    {
      id: '4',
      name: 'Emma Thompson',
      xp: 5800,
      level: 19,
      rank: 4,
      avatar: '/placeholder.svg',
      weeklyXP: 290,
      completedQuests: 39,
      badges: ['Consistent', 'Team Player']
    },
    {
      id: '5',
      name: 'David Kim',
      xp: 5200,
      level: 17,
      rank: 5,
      avatar: '/placeholder.svg',
      weeklyXP: 275,
      completedQuests: 35,
      badges: ['Newcomer', 'Fast Learner']
    },
    {
      id: '6',
      name: 'Lisa Wang',
      xp: 4750,
      level: 16,
      rank: 6,
      avatar: '/placeholder.svg',
      weeklyXP: 250,
      completedQuests: 32,
      badges: ['Active', 'Supporter']
    },
    {
      id: '7',
      name: 'James Wilson',
      xp: 4200,
      level: 14,
      rank: 7,
      avatar: '/placeholder.svg',
      weeklyXP: 220,
      completedQuests: 28,
      badges: ['Contributor']
    },
    {
      id: '8',
      name: 'Maria Garcia',
      xp: 3900,
      level: 13,
      rank: 8,
      avatar: '/placeholder.svg',
      weeklyXP: 200,
      completedQuests: 26,
      badges: ['Engaged']
    }
  ];

  const weeklyUsers = [...allTimeUsers]
    .sort((a, b) => b.weeklyXP - a.weeklyXP)
    .map((user, index) => ({ ...user, rank: index + 1 }));

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-purple-300 font-bold">{rank}</div>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-400/30';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-amber-400/30';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  const currentUsers = activeTab === 'all-time' ? allTimeUsers : weeklyUsers;
  const xpKey = activeTab === 'all-time' ? 'xp' : 'weeklyXP';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">🏆 Leaderboard</h1>
          <p className="text-purple-200 text-lg">Compete with the community and climb to the top!</p>
        </div>

        {/* Top 3 Podium */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <CardTitle className="text-center">🎯 Hall of Fame</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentUsers.slice(0, 3).map((user, index) => {
                const positions = [1, 0, 2]; // Second place in middle for podium effect
                const actualIndex = positions[index];
                const actualUser = currentUsers[actualIndex];
                const heights = ['h-32', 'h-40', 'h-28']; // Different heights for podium effect
                
                return (
                  <div key={actualUser.id} className={`text-center space-y-2 ${heights[index]}`}>
                    <div className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold mb-2 ${actualUser.rank === 1 ? 'ring-4 ring-yellow-400' : ''}`}>
                      {actualUser.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      {getRankIcon(actualUser.rank)}
                      <h3 className="font-semibold text-lg">{actualUser.name}</h3>
                      <p className="text-yellow-400 font-bold">
                        {actualUser[xpKey].toLocaleString()} {activeTab === 'weekly' ? 'Weekly' : 'Total'} XP
                      </p>
                      <p className="text-purple-200 text-sm">Level {actualUser.level}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard Tabs */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Rankings
            </CardTitle>
            <CardDescription className="text-purple-200">
              Track your progress against other community members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="all-time" className="data-[state=active]:bg-purple-500">
                  All Time
                </TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-purple-500">
                  This Week
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-3">
                  {currentUsers.map((user) => (
                    <Card 
                      key={user.id} 
                      className={`${getRankBg(user.rank)} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {getRankIcon(user.rank)}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-lg font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-white text-lg">{user.name}</h3>
                              <div className="flex items-center gap-4 text-sm text-purple-200">
                                <span>Level {user.level}</span>
                                <span>•</span>
                                <span>{user.completedQuests} quests completed</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {user.badges.slice(0, 2).map((badge, index) => (
                                  <Badge key={index} className="text-xs bg-purple-500/30 text-purple-200">
                                    {badge}
                                  </Badge>
                                ))}
                                {user.badges.length > 2 && (
                                  <Badge className="text-xs bg-purple-500/30 text-purple-200">
                                    +{user.badges.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-yellow-400">
                              {user[xpKey].toLocaleString()}
                            </div>
                            <div className="text-sm text-purple-200">
                              {activeTab === 'weekly' ? 'Weekly XP' : 'Total XP'}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Motivation Section */}
        <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg border-purple-400/30 text-white">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Ready to climb higher?</h3>
            <p className="text-purple-200 mb-4">
              Complete more quests, engage with the community, and earn your spot at the top!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
