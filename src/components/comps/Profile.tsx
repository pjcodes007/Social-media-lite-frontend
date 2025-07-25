import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import axios from "axios";
import DoodleBackground from "./DoodleBackground";

interface Post {
  id: number;
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  followers: string[];
  following: string[];
  bio?: string;
}

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followersUsernames, setFollowersUsernames] = useState<string[]>([]);
  const [followingUsernames, setFollowingUsernames] = useState<string[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [newBio, setNewBio] = useState("");
  const token = localStorage.getItem("token");

  const getUsernameFromId = async (id: string): Promise<string | null> => {
    try {
      const res = await axios.get(
        `https://social-media-lite-f238.onrender.com/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.username;
    } catch (err) {
      console.error(`Failed to fetch username for id ${id}`, err);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      const decoded = parseJwt(token);
      const userId = decoded?.id;

      try {
        const userRes = await axios.get(
          `https://social-media-lite-f238.onrender.com/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = userRes.data;
        setUser(userData);
        setNewAvatar(userData.avatar || "");
        setNewBio(userData.bio || "");

        const photosRes = await axios.get(
          "https://social-media-lite-f238.onrender.com/photos/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(photosRes.data);

        const followers = await Promise.all(
          userData.followers.map(async (id: string) => {
            const username = await getUsernameFromId(id);
            return username ?? "Unknown";
          })
        );
        setFollowersUsernames(followers);

        const following = await Promise.all(
          userData.following.map(async (id: string) => {
            const username = await getUsernameFromId(id);
            return username ?? "Unknown";
          })
        );
        setFollowingUsernames(following);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchData();
  }, [token]);

  const updatePost = (id: number, data: Partial<Post>) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...data } : post))
    );
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen px-6 py-24 text-black bg-transparent backdrop-blur-md">
      <DoodleBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Profile Info */}
        <div className="text-center space-y-2">
          <div className="relative group w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-black/20">
            <img
              src={user.avatar || "https://i.pravatar.cc/150?img=12"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setIsEditOpen(true)}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-xl font-bold text-black">{user.username}</h1>
          <p className="text-sm text-gray-700">{user.bio || "No bio yet"}</p>

          <div className="flex justify-center gap-6 mt-2 text-sm text-gray-800">
            <Dialog>
              <DialogTrigger>
                <span className="hover:underline cursor-pointer">
                  Followers: {followersUsernames.length}
                </span>
              </DialogTrigger>
              <DialogContent className="bg-white text-black p-4 max-w-xs rounded-xl border border-gray-300">
                <DialogTitle>Followers</DialogTitle>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  {followersUsernames.map((f, i) => (
                    <li key={`follower-${i}`}>{f}</li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <span className="hover:underline cursor-pointer">
                  Following: {followingUsernames.length}
                </span>
              </DialogTrigger>
              <DialogContent className="bg-white text-black p-4 max-w-xs rounded-xl border border-gray-300">
                <DialogTitle>Following</DialogTitle>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  {followingUsernames.map((f, i) => (
                    <li key={`following-${i}`}>{f}</li>
                  ))}
                </ul>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Post Grid */}
        <div className="relative w-full h-[600px] border border-black/10 rounded-xl bg-white overflow-hidden">
          {posts.map((post) => (
            <Rnd
              key={post.id}
              bounds="parent"
              size={{ width: post.width, height: post.height }}
              position={{ x: post.x, y: post.y }}
              onDragStop={(_, d) => updatePost(post.id, { x: d.x, y: d.y })}
              onResizeStop={(_, __, ref, ___, position) =>
                updatePost(post.id, {
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  ...position,
                })
              }
              className="rounded-lg overflow-hidden shadow-md border border-black/10"
            >
              <img
                src={post.image}
                alt={`Post ${post.id}`}
                className="w-full h-full object-cover"
              />
            </Rnd>
          ))}
        </div>
      </motion.div>

      {/* Edit Profile Dialog */}
      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white text-black p-4 rounded-xl">
          <DialogTitle>Edit Profile</DialogTitle>
          <div className="space-y-4 mt-2">
            <div>
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="Write something about yourself..."
              />
            </div>

            <Button
              onClick={async () => {
                try {
                  const res = await axios.put(
                    `https://social-media-lite-f238.onrender.com/users/profile/`,
                    {
                      bio: newBio,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  setUser(res.data);
                  setIsEditOpen(false);
                } catch (err) {
                  console.error("Failed to update profile:", err);
                }
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
