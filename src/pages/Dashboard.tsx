
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Users, Star, Clock, CheckCircle, Zap, Award } from 'lucide-react';

const Dashboard = () => {
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);

  const userStats = {
    totalXP: 2450,
    rank: 7,
    weeklyXP: 320,
    completedQuests: 12,
    badges: 4
  };

  const availableQuests = [
    {
      id: '1',
      title: 'Follow us on Twitter',
      description: 'Follow our official Twitter account and help us grow our community',
      xp: 100,
      difficulty: 'Easy',
      category: 'Social',
      timeEstimate: '2 min',
      type: 'social'
    },
    {
      id: '2',
      title: 'Join Discord Community',
      description: 'Join our Discord server and introduce yourself in #general',
      xp: 150,
      difficulty: 'Easy',
      category: 'Social',
      timeEstimate: '5 min',
      type: 'social'
    },
    {
      id: '3',
      title: 'Share your story',
      description: 'Upload a photo or video sharing how our platform helped you',
      xp: 250,
      difficulty: 'Medium',
      category: 'Content',
      timeEstimate: '10 min',
      type: 'upload'
    },
    {
      id: '4',
      title: 'Community Quiz',
      description: 'Test your knowledge about our platform and community guidelines',
      xp: 200,
      difficulty: 'Medium',
      category: 'Knowledge',
      timeEstimate: '8 min',
      type: 'quiz'
    }
  ];

  const recentActivity = [
    { action: 'Completed "Follow us on Twitter"', xp: 100, time: '2 hours ago' },
    { action: 'Earned "Early Adopter" badge', xp: 0, time: '1 day ago' },
    { action: 'Completed "Join Discord"', xp: 150, time: '2 days ago' },
    { action: 'Completed "Community Quiz"', xp: 200, time: '3 days ago' }
  ];

  const handleQuestComplete = (questId: string) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests([...completedQuests, questId]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Social': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Content': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Knowledge': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const rankProgress = ((userStats.rank - 1) / 10) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold text-white">Welcome back!</h1>
        <p className="text-slate-300">Complete quests to earn XP and climb the leaderboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{userStats.totalXP.toLocaleString()}</div>
            <div className="text-sm text-slate-400">Total XP</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">#{userStats.rank}</div>
            <div className="text-sm text-slate-400">Global Rank</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{userStats.weeklyXP}</div>
            <div className="text-sm text-slate-400">Weekly XP</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{userStats.completedQuests}</div>
            <div className="text-sm text-slate-400">Quests Done</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{userStats.badges}</div>
            <div className="text-sm text-slate-400">Badges</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Quests */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Available Quests</h2>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              {availableQuests.length} available
            </Badge>
          </div>
          
          <div className="space-y-4">
            {availableQuests.map((quest) => {
              const isCompleted = completedQuests.includes(quest.id);
              
              return (
                <Card key={quest.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:bg-slate-800/70 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-purple-400" />
                          <h3 className="text-lg font-semibold text-white">{quest.title}</h3>
                          {isCompleted && <CheckCircle className="w-5 h-5 text-green-400" />}
                        </div>
                        <p className="text-slate-300 mb-3">{quest.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={getDifficultyColor(quest.difficulty)}>
                            {quest.difficulty}
                          </Badge>
                          <Badge className={getCategoryColor(quest.category)}>
                            {quest.category}
                          </Badge>
                          <Badge className="bg-slate-600/30 text-slate-300 border-slate-600/30">
                            <Clock className="w-3 h-3 mr-1" />
                            {quest.timeEstimate}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">
                          +{quest.xp} XP
                        </div>
                        <Button
                          onClick={() => handleQuestComplete(quest.id)}
                          disabled={isCompleted}
                          className={isCompleted 
                            ? "bg-green-600 text-white cursor-default" 
                            : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                          }
                        >
                          {isCompleted ? 'Completed' : 'Start Quest'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rank Progress */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Rank Progress
              </CardTitle>
              <CardDescription className="text-slate-400">
                You're #{userStats.rank} globally
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress to Top 5</span>
                  <span className="text-white font-medium">
                    {Math.round(rankProgress)}%
                  </span>
                </div>
                <Progress value={rankProgress} className="h-2" />
                <div className="text-center">
                  <div className="text-lg font-semibold text-white mb-1">
                    {5 - userStats.rank} ranks to go!
                  </div>
                  <p className="text-sm text-slate-400">
                    Keep completing quests to climb higher
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 last:pb-0 border-b border-slate-700/50 last:border-b-0">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {activity.xp > 0 && (
                          <span className="text-xs text-yellow-400">+{activity.xp} XP</span>
                        )}
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                View Leaderboard
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                Check Profile
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white">
                Browse All Quests
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
