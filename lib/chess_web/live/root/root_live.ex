defmodule ChessWeb.RootLive do
  @moduledoc false

  use ChessWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
