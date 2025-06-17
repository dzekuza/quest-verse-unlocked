import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Users, Target, CheckCircle, Clock, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Quest {
  id: string;
  title: string;
  description: string;
  xp: number;
  type: 'social' | 'upload' | 'quiz' | 'link';
  status: 'active' | 'inactive';
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  createdAt: string;
  completions: number;
}

interface QuestSubmission {
  id: string;
  questId: string;
  questTitle: string;
  userId: string;
  userName: string;
  submissionData: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  xpAwarded?: number;
}

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('quests');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Follow us on Twitter',
      description: 'Follow our official Twitter account and help us grow our community',
      xp: 100,
      type: 'social',
      status: 'active',
      category: 'Social Media',
      difficulty: 'easy',
      createdAt: '2024-01-10',
      completions: 87
    },
    {
      id: '2',
      title: 'Share your story',
      description: 'Upload a photo or video sharing how our platform helped you',
      xp: 250,
      type: 'upload',
      status: 'active',
      category: 'Content Creation',
      difficulty: 'medium',
      createdAt: '2024-01-08',
      completions: 34
    },
    {
      id: '3',
      title: 'Community Quiz',
      description: 'Test your knowledge about our platform and community guidelines',
      xp: 150,
      type: 'quiz',
      status: 'active',
      category: 'Knowledge',
      difficulty: 'easy',
      createdAt: '2024-01-05',
      completions: 156
    },
    {
      id: '4',
      title: 'Join Discord Server',
      description: 'Join our Discord community and introduce yourself',
      xp: 200,
      type: 'social',
      status: 'inactive',
      category: 'Social Media',
      difficulty: 'easy',
      createdAt: '2024-01-03',
      completions: 67
    }
  ]);

  const [submissions, setSubmissions] = useState<QuestSubmission[]>([
    {
      id: '1',
      questId: '1',
      questTitle: 'Follow us on Twitter',
      userId: 'user1',
      userName: 'Sarah Chen',
      submissionData: 'Twitter handle: @sarahc_dev - Followed and retweeted pinned post',
      status: 'pending',
      submittedAt: '2024-01-15 14:30'
    },
    {
      id: '2',
      questId: '2',
      questTitle: 'Share your story',
      userId: 'user2',
      userName: 'Marcus Rodriguez',
      submissionData: 'Uploaded success story video: https://example.com/video123',
      status: 'pending',
      submittedAt: '2024-01-15 12:15'
    },
    {
      id: '3',
      questId: '1',
      questTitle: 'Follow us on Twitter',
      userId: 'user3',
      userName: 'Emma Thompson',
      submissionData: 'Twitter handle: @emmathompson - Followed account',
      status: 'approved',
      submittedAt: '2024-01-14 16:45',
      xpAwarded: 100
    },
    {
      id: '4',
      questId: '3',
      questTitle: 'Community Quiz',
      userId: 'user4',
      userName: 'David Kim',
      submissionData: 'Quiz completed with score: 9/10 questions correct',
      status: 'rejected',
      submittedAt: '2024-01-14 10:20'
    }
  ]);

  const [newQuest, setNewQuest] = useState({
    title: '',
    description: '',
    xp: 100,
    type: 'social' as const,
    category: '',
    difficulty: 'easy' as const
  });

  const handleCreateQuest = () => {
    if (!newQuest.title || !newQuest.description || !newQuest.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const quest: Quest = {
      id: Date.now().toString(),
      ...newQuest,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      completions: 0
    };

    setQuests([quest, ...quests]);
    setNewQuest({
      title: '',
      description: '',
      xp: 100,
      type: 'social',
      category: '',
      difficulty: 'easy'
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Quest Created!",
      description: "Your new quest has been added and is now active.",
    });
  };

  const handleToggleQuestStatus = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId 
        ? { ...quest, status: quest.status === 'active' ? 'inactive' : 'active' }
        : quest
    ));
  };

  const handleDeleteQuest = (questId: string) => {
    setQuests(prev => prev.filter(quest => quest.id !== questId));
    toast({
      title: "Quest Deleted",
      description: "The quest has been removed from the system.",
    });
  };

  const handleSubmissionAction = (submissionId: string, action: 'approve' | 'reject') => {
    setSubmissions(prev => prev.map(submission => {
      if (submission.id === submissionId) {
        const quest = quests.find(q => q.id === submission.questId);
        return {
          ...submission,
          status: action === 'approve' ? 'approved' : 'rejected',
          xpAwarded: action === 'approve' ? quest?.xp : undefined
        };
      }
      return submission;
    }));

    toast({
      title: action === 'approve' ? "Submission Approved!" : "Submission Rejected",
      description: action === 'approve' 
        ? "XP has been awarded to the user." 
        : "The submission has been rejected.",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'social': return <Users className="w-4 h-4" />;
      case 'upload': return <Target className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'link': return <Target className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const activeQuestCount = quests.filter(q => q.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-300">Manage quests and review user submissions</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{activeQuestCount}</div>
              <div className="text-sm text-slate-400">Active Quests</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
              <div className="text-sm text-slate-400">Pending Reviews</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Admin Tabs */}
      <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
              <TabsTrigger value="quests" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                Quest Management
              </TabsTrigger>
              <TabsTrigger value="submissions" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                Submissions ({pendingCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quests" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Manage Quests</h3>
                  <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Quest
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-white">Create New Quest</DialogTitle>
                        <DialogDescription className="text-slate-300">
                          Add a new quest for community members to complete.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-white">Quest Title</Label>
                          <Input
                            id="title"
                            value={newQuest.title}
                            onChange={(e) => setNewQuest({...newQuest, title: e.target.value})}
                            placeholder="Enter quest title..."
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-white">Description</Label>
                          <Textarea
                            id="description"
                            value={newQuest.description}
                            onChange={(e) => setNewQuest({...newQuest, description: e.target.value})}
                            placeholder="Describe what users need to do..."
                            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="xp" className="text-white">XP Reward</Label>
                            <Input
                              id="xp"
                              type="number"
                              value={newQuest.xp}
                              onChange={(e) => setNewQuest({...newQuest, xp: parseInt(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-white">Category</Label>
                            <Input
                              id="category"
                              value={newQuest.category}
                              onChange={(e) => setNewQuest({...newQuest, category: e.target.value})}
                              placeholder="e.g., Social Media"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="type" className="text-white">Quest Type</Label>
                            <Select value={newQuest.type} onValueChange={(value: any) => setNewQuest({...newQuest, type: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="social">Social Media</SelectItem>
                                <SelectItem value="upload">Upload Content</SelectItem>
                                <SelectItem value="quiz">Quiz/Survey</SelectItem>
                                <SelectItem value="link">Link Submission</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="difficulty" className="text-white">Difficulty</Label>
                            <Select value={newQuest.difficulty} onValueChange={(value: any) => setNewQuest({...newQuest, difficulty: value})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            Cancel
                          </Button>
                          <Button onClick={handleCreateQuest} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                            Create Quest
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {quests.map((quest) => (
                    <Card key={quest.id} className="bg-slate-700/30 backdrop-blur-sm border-slate-600/50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(quest.type)}
                            <Badge variant="outline" className="text-xs border-slate-500 text-slate-300">
                              {quest.category}
                            </Badge>
                            <Badge className={getDifficultyColor(quest.difficulty)}>
                              {quest.difficulty}
                            </Badge>
                          </div>
                          <Badge className={quest.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}>
                            {quest.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-white">{quest.title}</CardTitle>
                        <CardDescription className="text-slate-300">
                          {quest.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm text-slate-300">
                            <span className="text-yellow-400 font-semibold">{quest.xp} XP</span>
                            <span>{quest.completions} completions</span>
                            <span>Created {quest.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleQuestStatus(quest.id)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                          >
                            {quest.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteQuest(quest.id)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="submissions" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Review Submissions</h3>
                
                <div className="space-y-3">
                  {submissions.map((submission) => (
                    <Card key={submission.id} className="bg-slate-700/30 backdrop-blur-sm border-slate-600/50">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-white font-semibold">{submission.questTitle}</h4>
                              <Badge className={getStatusColor(submission.status)}>
                                {submission.status}
                              </Badge>
                            </div>
                            <p className="text-slate-300 text-sm mb-2">
                              Submitted by <span className="font-medium text-white">{submission.userName}</span>
                            </p>
                            <p className="text-slate-400 text-sm mb-3">
                              {submission.submissionData}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {submission.submittedAt}
                              </span>
                              {submission.xpAwarded && (
                                <span className="text-yellow-400">
                                  +{submission.xpAwarded} XP awarded
                                </span>
                              )}
                            </div>
                          </div>
                          {submission.status === 'pending' && (
                            <div className="flex space-x-2 ml-4">
                              <Button
                                size="sm"
                                onClick={() => handleSubmissionAction(submission.id, 'approve')}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSubmissionAction(submission.id, 'reject')}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
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
  );
};

export default Admin;
