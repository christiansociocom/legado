-- Safe function for admins to list users from profiles table
-- Uses SECURITY DEFINER so it runs with elevated privileges,
-- but the internal check ensures only admins can call it.
CREATE OR REPLACE FUNCTION public.get_all_users_for_admin()
RETURNS TABLE (
  user_id   UUID,
  email     TEXT,
  full_name TEXT,
  role      TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Guard: only admins may call this function
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  RETURN QUERY
    SELECT
      p.user_id,
      u.email,
      p.full_name,
      COALESCE(ur.role::TEXT, 'user') AS role,
      p.created_at
    FROM public.profiles p
    JOIN auth.users u ON u.id = p.user_id
    LEFT JOIN public.user_roles ur ON ur.user_id = p.user_id AND ur.role != 'user'
    ORDER BY p.created_at DESC;
END;
$$;
