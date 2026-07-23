import { useEffect, useState } from "react";
import { fetchGithubData, type GithubData } from "@/services/github";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: GithubData };

export function useGithubData(username: string) {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    setState({ status: "loading" });
    fetchGithubData(username)
      .then((data) => {
        if (!cancelled) setState({ status: "success", data });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ status: "error", message: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
