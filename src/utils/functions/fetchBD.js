import { supabase } from "../../lib/supabase";

export const fetchAppointments = async (userId, date) => {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select(`
            *,
            works (
            name,
            price
            ), 
            customers (
            name,
            phone
            )
            `)
      .eq('user_id', userId)
      .eq('date', date)
      .order("time", { ascending: true });
    if (error) {
      throw error;
    }
    if (!data || data.length === 0) {
      // se não houver dados, retorna um array vazio
      return [];
    }
    return data;

  } catch (error) {
    console.error("Erro ao consultar os agendamentos.", error);
    throw new Error("Failed to fetch appointments");
  }
}