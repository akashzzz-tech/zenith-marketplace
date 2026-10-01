import { Tabs } from 'expo-router';

export default function ClientLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#0F172A' }}>
      <Tabs.Screen name="index" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="post-project" options={{ title: 'Post Project' }} />
      <Tabs.Screen name="my-projects" options={{ title: 'My Projects' }} />
      <Tabs.Screen name="talent" options={{ title: 'Talent' }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages' }} />
      <Tabs.Screen name="contracts" options={{ title: 'Contracts' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="project-proposals" options={{ href: null }} />
    </Tabs>
  );
}
