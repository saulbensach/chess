defmodule Chess do
  @moduledoc """
  Chess keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """


  def a() do
    [
      :juridical_person_document,
      [re_developments: [[properties: [[re_development: [:re_developer]]]]]],
      :legal_address
    ]
    |> Enum.map(fn
      a when is_atom(a) -> a
      a -> Enum.map(a, &List.first/1)
    end)
  end
end
