
const fetchEvents = async () => {
    let client = supabase.from("events").select("*");
    const search = searchParams.get("search");
    if (search) {
      client = client.ilike("name", `%${search}%`);
    }
    const { data } = await client.order("start_date", { ascending: true });
    setEvents(data as EventType[]);
    setLoading(false);
};