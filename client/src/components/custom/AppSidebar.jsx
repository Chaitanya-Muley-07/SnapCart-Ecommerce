import {  ChartBar, FilePlus2, GalleryVerticalEnd, PackageSearchIcon,  Settings } from "lucide-react";
import {useLocation} from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUserLogout } from "../../redux/slices/authSlice";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// Menu items.
const items = [
  {
    title: "Create Products",
    url: "/admin/dashboard",
    icon: FilePlus2,
  },
  {
    title: "All Products",
    url: "/admin/dashboard/all-products",
    icon: GalleryVerticalEnd,
  },
  {
    title: "Orders",
    url: "/admin/dashboard/orders",
    icon: PackageSearchIcon,
  },
  {
    title: "Analytics",
    url: "/admin/dashboard/analytics",
    icon: ChartBar,
  },
  {
    title: "Settings",
    url: "/admin/dashboard/settings",
    icon: Settings,
  },
];

const AppSidebar=()=> {
const {pathname}= useLocation();
const dispatch=useDispatch();
const {toast}=useToast();
  return (
    <Sidebar>
    <SidebarHeader>
      <h3 className="text-xl font-bold">Dashboard</h3>
    </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>

            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={`${pathname===item.url && "bg-zinc-200 dark:bg-zinc-600"}`}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={()=>{
          dispatch(setUserLogout())
          toast({
            title: "Logged out successfully"
          })
          }}>
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
export default AppSidebar;
