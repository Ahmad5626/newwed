"use client";
import Link from "next/link";
import Image from "next/image";
import { INVITE_TEMPLATES } from "@/app/utils/invite-templates";
import Footer from "@/components/Footer";
import Navbar from "@/components/Hedaer";

export default function InviteGallery() {
  return (
  <>
  <Navbar fixed={true} />
      <section className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Wedding Cards</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {INVITE_TEMPLATES.map((item) => (
          <Link
            key={item.id}
            href={`/invite/${item.id}`}
            className="cursor-pointer group"
          >
            <div className="overflow-hidden rounded-xl border bg-white shadow">
              <img
                src={item.image}
                alt={item.title}
                width={400}
                height={600}
                className="w-full object-cover group-hover:opacity-80 transition"
              />
            </div>
            <p className="mt-2 text-center text-lg font-medium">{item.title}</p>
          </Link>
        ))}
      </div>
    </section>
    <Footer/>
  </>
  );
}
