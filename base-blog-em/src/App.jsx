import { Posts } from "./Posts";
import "./App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClinet = new QueryClient();

function App() {
  return (
    // provide React Query client to App
    <QueryClientProvider client={queryClinet}>
      <div className="App">
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
