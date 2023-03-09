import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then((res) => res.json())
export default function UseFetcher(url) {
    const { data, error } = useSWR(url, fetcher);
    const isLoading = !data && !error;
    return [isLoading, data, error];
}