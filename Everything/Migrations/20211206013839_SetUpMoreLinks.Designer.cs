﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using everything.Data;

namespace everything.Migrations
{
    [DbContext(typeof(EverythingContext))]
    [Migration("20211206013839_SetUpMoreLinks")]
    partial class SetUpMoreLinks
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("everything.Models.Lift", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.Property<string>("VideoLink")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Lifts");
                });

            modelBuilder.Entity("everything.Models.LiftDayPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LiftDayPlans");
                });

            modelBuilder.Entity("everything.Models.LiftRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("LiftId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LiftId");

                    b.ToTable("LiftRecords");
                });

            modelBuilder.Entity("everything.Models.LiftSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LiftRecordId")
                        .HasColumnType("int");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<int>("Reps")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LiftRecordId");

                    b.ToTable("LiftSets");
                });

            modelBuilder.Entity("everything.Models.MuscleGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("MuscleGroups");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLift", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LiftId")
                        .HasColumnType("int");

                    b.Property<int>("MuscleGroupId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LiftId");

                    b.HasIndex("MuscleGroupId");

                    b.ToTable("MuscleGroupForLifts");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLiftDayPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LiftDayPlanId")
                        .HasColumnType("int");

                    b.Property<int>("MuscleGroupId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LiftDayPlanId");

                    b.HasIndex("MuscleGroupId");

                    b.ToTable("MuscleGroupForLiftDayPlans");
                });

            modelBuilder.Entity("everything.Models.ToDoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("ToDoItems");
                });

            modelBuilder.Entity("everything.Models.LiftRecord", b =>
                {
                    b.HasOne("everything.Models.Lift", "Lift")
                        .WithMany("LiftRecords")
                        .HasForeignKey("LiftId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lift");
                });

            modelBuilder.Entity("everything.Models.LiftSet", b =>
                {
                    b.HasOne("everything.Models.LiftRecord", "LiftRecord")
                        .WithMany("LiftSets")
                        .HasForeignKey("LiftRecordId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LiftRecord");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLift", b =>
                {
                    b.HasOne("everything.Models.Lift", "Lift")
                        .WithMany("MuscleGroupLinks")
                        .HasForeignKey("LiftId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("everything.Models.MuscleGroup", "MuscleGroup")
                        .WithMany("MuscleGroupForLiftsLinks")
                        .HasForeignKey("MuscleGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Lift");

                    b.Navigation("MuscleGroup");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLiftDayPlan", b =>
                {
                    b.HasOne("everything.Models.LiftDayPlan", "LiftDayPlan")
                        .WithMany("MuscleGroupForLiftsLinks")
                        .HasForeignKey("LiftDayPlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("everything.Models.MuscleGroup", "MuscleGroup")
                        .WithMany("MuscleGroupForPlanLinks")
                        .HasForeignKey("MuscleGroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LiftDayPlan");

                    b.Navigation("MuscleGroup");
                });

            modelBuilder.Entity("everything.Models.Lift", b =>
                {
                    b.Navigation("LiftRecords");

                    b.Navigation("MuscleGroupLinks");
                });

            modelBuilder.Entity("everything.Models.LiftDayPlan", b =>
                {
                    b.Navigation("MuscleGroupForLiftsLinks");
                });

            modelBuilder.Entity("everything.Models.LiftRecord", b =>
                {
                    b.Navigation("LiftSets");
                });

            modelBuilder.Entity("everything.Models.MuscleGroup", b =>
                {
                    b.Navigation("MuscleGroupForLiftsLinks");

                    b.Navigation("MuscleGroupForPlanLinks");
                });
#pragma warning restore 612, 618
        }
    }
}
